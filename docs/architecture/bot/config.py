"""Application configuration loaded only from environment variables."""

from dataclasses import dataclass
import os

from dotenv import load_dotenv


@dataclass(frozen=True, slots=True)
class Settings:
    telegram_token: str
    groq_api_key: str
    admin_ids: frozenset[int]
    database_path: str = "bot_data.sqlite3"
    free_limit: int = 15
    premium_limit: int = 100


def load_settings() -> Settings:
    load_dotenv()
    telegram_token = os.getenv("TELEGRAM_TOKEN", "").strip()
    groq_api_key = os.getenv("GROQ_API_KEY", "").strip()
    if not telegram_token or not groq_api_key:
        raise RuntimeError("TELEGRAM_TOKEN va GROQ_API_KEY .env faylida bo'lishi shart.")

    raw_admin_ids = os.getenv("ADMIN_IDS", "")
    admin_ids = frozenset(
        int(value.strip()) for value in raw_admin_ids.split(",") if value.strip()
    )
    return Settings(
        telegram_token=telegram_token,
        groq_api_key=groq_api_key,
        admin_ids=admin_ids,
        database_path=os.getenv("DATABASE_PATH", "bot_data.sqlite3"),
    )
