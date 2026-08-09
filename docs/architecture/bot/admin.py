"""Administrator-only callbacks and broadcast workflow."""

import asyncio
import logging

from telegram import Update
from telegram.error import Forbidden, TelegramError
from telegram.ext import ContextTypes

from .keyboards import admin_keyboard
from .utils import reply_markdown


logger = logging.getLogger(__name__)


def is_admin(update: Update, context: ContextTypes.DEFAULT_TYPE) -> bool:
    return bool(update.effective_user and update.effective_user.id in context.application.bot_data["settings"].admin_ids)


async def admin_menu(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.message is None:
        return
    if not is_admin(update, context):
        await update.message.reply_text("Bu buyruq faqat administratorlar uchun.")
        return
    await update.message.reply_text("*Admin panel*", reply_markup=admin_keyboard(), parse_mode="Markdown")


async def handle_admin_callback(update: Update, context: ContextTypes.DEFAULT_TYPE, action: str) -> None:
    query = update.callback_query
    if query is None or update.effective_user is None:
        return
    if not is_admin(update, context):
        await query.edit_message_text("Ruxsat berilmagan.")
        return

    db = context.application.bot_data["db"]
    if action == "stats":
        users, premium, requests = await db.statistics()
        await query.edit_message_text(
            f"*Statistika*\n\n👥 Foydalanuvchilar: *{users}*\n💎 Premium: *{premium}*\n📊 Bugungi so'rovlar: *{requests}*",
            parse_mode="Markdown", reply_markup=admin_keyboard(),
        )
    elif action == "users":
        rows = await db.recent_users()
        lines = ["*Oxirgi foydalanuvchilar*"]
        for row in rows:
            name = row["full_name"] or "Noma'lum"
            username = f" @{row['username']}" if row["username"] else ""
            badge = " 💎" if row["premium"] else ""
            lines.append(f"• `{row['user_id']}` — {name}{username}{badge}")
        await query.edit_message_text("\n".join(lines), parse_mode="Markdown", reply_markup=admin_keyboard())
    elif action in {"add", "remove"}:
        mode = "admin_add_premium" if action == "add" else "admin_remove_premium"
        await db.set_mode(update.effective_user.id, mode)
        verb = "qo'shish" if action == "add" else "olib tashlash"
        await query.edit_message_text(f"Premiumdan {verb} uchun Telegram ID yuboring.", reply_markup=admin_keyboard())
    elif action == "broadcast":
        await db.set_mode(update.effective_user.id, "admin_broadcast")
        await query.edit_message_text("Barcha foydalanuvchilarga yuboriladigan xabarni yozing.", reply_markup=admin_keyboard())


async def process_admin_input(update: Update, context: ContextTypes.DEFAULT_TYPE, mode: str, text: str) -> bool:
    """Returns True when the message was consumed by an admin workflow."""
    if update.message is None or update.effective_user is None or not is_admin(update, context):
        return False
    db = context.application.bot_data["db"]
    if mode in {"admin_add_premium", "admin_remove_premium"}:
        try:
            target_id = int(text.strip())
        except ValueError:
            await update.message.reply_text("Faqat son ko'rinishidagi Telegram ID yuboring.")
            return True
        enabled = mode == "admin_add_premium"
        await db.set_premium(target_id, enabled, context.application.bot_data["default_model"])
        await db.set_mode(update.effective_user.id, "chat")
        await update.message.reply_text("Premium holati yangilandi." if enabled else "Premium holati olib tashlandi.")
        return True
    if mode == "admin_broadcast":
        await db.set_mode(update.effective_user.id, "chat")
        user_ids = await db.user_ids()
        delivered = await broadcast(context, user_ids, text)
        await update.message.reply_text(f"Xabar {delivered}/{len(user_ids)} foydalanuvchiga yuborildi.")
        return True
    return False


async def broadcast(context: ContextTypes.DEFAULT_TYPE, user_ids: list[int], text: str) -> int:
    semaphore = asyncio.Semaphore(20)

    async def send(user_id: int) -> bool:
        async with semaphore:
            try:
                await context.bot.send_message(user_id, text)
                return True
            except (Forbidden, TelegramError):
                logger.info("Broadcast delivery failed for user %s", user_id)
                return False

    results = await asyncio.gather(*(send(user_id) for user_id in user_ids))
    return sum(results)
