"""Small SQLite persistence layer. Each database call runs off the event loop."""

import asyncio
import sqlite3
from datetime import date
from pathlib import Path


class Database:
    def __init__(self, path: str) -> None:
        self.path = Path(path)

    def _connect(self) -> sqlite3.Connection:
        connection = sqlite3.connect(self.path, timeout=15)
        connection.row_factory = sqlite3.Row
        return connection

    async def initialize(self) -> None:
        def create_tables() -> None:
            with self._connect() as db:
                db.executescript(
                    """
                    PRAGMA journal_mode=WAL;
                    CREATE TABLE IF NOT EXISTS users (
                        user_id INTEGER PRIMARY KEY,
                        username TEXT,
                        full_name TEXT,
                        premium INTEGER NOT NULL DEFAULT 0,
                        model TEXT NOT NULL,
                        mode TEXT NOT NULL DEFAULT 'chat',
                        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
                    );
                    CREATE TABLE IF NOT EXISTS messages (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        user_id INTEGER NOT NULL,
                        role TEXT NOT NULL CHECK(role IN ('user', 'assistant')),
                        content TEXT NOT NULL,
                        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
                    );
                    CREATE INDEX IF NOT EXISTS messages_user_id ON messages(user_id, id);
                    CREATE TABLE IF NOT EXISTS daily_usage (
                        user_id INTEGER NOT NULL,
                        usage_date TEXT NOT NULL,
                        count INTEGER NOT NULL DEFAULT 0,
                        PRIMARY KEY (user_id, usage_date)
                    );
                    """
                )
        await asyncio.to_thread(create_tables)

    async def ensure_user(self, user_id: int, username: str | None, full_name: str, default_model: str) -> None:
        def operation() -> None:
            with self._connect() as db:
                db.execute(
                    """INSERT INTO users(user_id, username, full_name, model)
                       VALUES (?, ?, ?, ?)
                       ON CONFLICT(user_id) DO UPDATE SET username=excluded.username, full_name=excluded.full_name""",
                    (user_id, username, full_name, default_model),
                )
        await asyncio.to_thread(operation)

    async def get_user(self, user_id: int) -> sqlite3.Row | None:
        def operation() -> sqlite3.Row | None:
            with self._connect() as db:
                return db.execute("SELECT * FROM users WHERE user_id=?", (user_id,)).fetchone()
        return await asyncio.to_thread(operation)

    async def set_mode(self, user_id: int, mode: str) -> None:
        await asyncio.to_thread(self._execute, "UPDATE users SET mode=? WHERE user_id=?", (mode, user_id))

    async def set_model(self, user_id: int, model: str) -> None:
        await asyncio.to_thread(self._execute, "UPDATE users SET model=? WHERE user_id=?", (model, user_id))

    async def set_premium(self, user_id: int, enabled: bool, default_model: str) -> None:
        def operation() -> None:
            with self._connect() as db:
                db.execute(
                    "INSERT INTO users(user_id, full_name, model, premium) VALUES (?, '', ?, ?) "
                    "ON CONFLICT(user_id) DO UPDATE SET premium=excluded.premium",
                    (user_id, default_model, int(enabled)),
                )
        await asyncio.to_thread(operation)

    async def clear_history(self, user_id: int) -> None:
        await asyncio.to_thread(self._execute, "DELETE FROM messages WHERE user_id=?", (user_id,))

    async def history(self, user_id: int, limit: int = 20) -> list[sqlite3.Row]:
        def operation() -> list[sqlite3.Row]:
            with self._connect() as db:
                rows = db.execute(
                    "SELECT role, content FROM messages WHERE user_id=? ORDER BY id DESC LIMIT ?",
                    (user_id, limit),
                ).fetchall()
                return list(reversed(rows))
        return await asyncio.to_thread(operation)

    async def add_exchange(self, user_id: int, prompt: str, answer: str) -> None:
        def operation() -> None:
            with self._connect() as db:
                db.executemany(
                    "INSERT INTO messages(user_id, role, content) VALUES (?, ?, ?)",
                    [(user_id, "user", prompt), (user_id, "assistant", answer)],
                )
                db.execute(
                    "DELETE FROM messages WHERE user_id=? AND id NOT IN "
                    "(SELECT id FROM messages WHERE user_id=? ORDER BY id DESC LIMIT 20)",
                    (user_id, user_id),
                )
        await asyncio.to_thread(operation)

    async def consume_request(self, user_id: int, limit: int) -> tuple[bool, int]:
        today = date.today().isoformat()
        def operation() -> tuple[bool, int]:
            with self._connect() as db:
                db.execute("BEGIN IMMEDIATE")
                row = db.execute(
                    "SELECT count FROM daily_usage WHERE user_id=? AND usage_date=?", (user_id, today)
                ).fetchone()
                count = int(row["count"]) if row else 0
                if count >= limit:
                    return False, 0
                count += 1
                db.execute(
                    "INSERT INTO daily_usage(user_id, usage_date, count) VALUES (?, ?, ?) "
                    "ON CONFLICT(user_id, usage_date) DO UPDATE SET count=excluded.count",
                    (user_id, today, count),
                )
                return True, limit - count
        return await asyncio.to_thread(operation)

    async def usage(self, user_id: int) -> int:
        today = date.today().isoformat()
        def operation() -> int:
            with self._connect() as db:
                row = db.execute("SELECT count FROM daily_usage WHERE user_id=? AND usage_date=?", (user_id, today)).fetchone()
                return int(row["count"]) if row else 0
        return await asyncio.to_thread(operation)

    async def statistics(self) -> tuple[int, int, int]:
        def operation() -> tuple[int, int, int]:
            with self._connect() as db:
                users = db.execute("SELECT COUNT(*) FROM users").fetchone()[0]
                premium = db.execute("SELECT COUNT(*) FROM users WHERE premium=1").fetchone()[0]
                requests = db.execute("SELECT COALESCE(SUM(count), 0) FROM daily_usage WHERE usage_date=?", (date.today().isoformat(),)).fetchone()[0]
                return users, premium, requests
        return await asyncio.to_thread(operation)

    async def recent_users(self, limit: int = 20) -> list[sqlite3.Row]:
        def operation() -> list[sqlite3.Row]:
            with self._connect() as db:
                return db.execute("SELECT user_id, username, full_name, premium FROM users ORDER BY created_at DESC LIMIT ?", (limit,)).fetchall()
        return await asyncio.to_thread(operation)

    async def user_ids(self) -> list[int]:
        def operation() -> list[int]:
            with self._connect() as db:
                return [row[0] for row in db.execute("SELECT user_id FROM users").fetchall()]
        return await asyncio.to_thread(operation)

    def _execute(self, query: str, params: tuple[object, ...]) -> None:
        with self._connect() as db:
            db.execute(query, params)
