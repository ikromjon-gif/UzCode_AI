"""Safe Telegram output helpers."""

import logging

from telegram import Message, Update
from telegram.constants import ParseMode


logger = logging.getLogger(__name__)


def chunks(text: str, size: int = 3900) -> list[str]:
    return [text[index:index + size] for index in range(0, len(text), size)] or ["—"]


async def reply_markdown(message: Message, text: str, **kwargs: object) -> None:
    """Try Markdown first; deliver plain text if AI Markdown is malformed."""
    for part in chunks(text):
        try:
            await message.reply_text(part, parse_mode=ParseMode.MARKDOWN, **kwargs)
        except Exception:
            logger.warning("Markdown parsing failed; sending plain text", exc_info=True)
            await message.reply_text(part, **kwargs)


async def ensure_user(update: Update, context: object) -> bool:
    """Store/update the Telegram profile before a handler uses persistent data."""
    if update.effective_user is None:
        return False
    db = context.application.bot_data["db"]
    default_model = context.application.bot_data["default_model"]
    user = update.effective_user
    await db.ensure_user(user.id, user.username, user.full_name, default_model)
    return True
