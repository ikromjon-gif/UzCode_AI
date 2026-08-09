"""Application entry point: run with `python -m bot.main`."""

import logging

from telegram import Update
from telegram.ext import Application, CallbackQueryHandler, CommandHandler, ContextTypes, MessageHandler, filters

from .admin import admin_menu
from .ai import AIService, DEFAULT_MODEL
from .config import load_settings
from .database import Database
from .handlers import callbacks, main_menu, start, text_message, show_limit
from .image import ImageService


logger = logging.getLogger(__name__)


async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE) -> None:
    logger.exception("Unhandled Telegram update error", exc_info=context.error)
    if isinstance(update, Update) and update.effective_message:
        try:
            await update.effective_message.reply_text("Kutilmagan xatolik yuz berdi. Bot ishlashda davom etadi.")
        except Exception:
            logger.exception("Could not send error notification")


async def post_init(application: Application) -> None:
    """Create database tables once the event loop is running."""
    await application.bot_data["db"].initialize()
    logger.info("Database initialized")


def main() -> None:
    settings = load_settings()
    database = Database(settings.database_path)
    application = Application.builder().token(settings.telegram_token).post_init(post_init).build()
    application.bot_data.update({
        "settings": settings,
        "db": database,
        "ai": AIService(settings.groq_api_key),
        "image": ImageService(),
        "default_model": DEFAULT_MODEL,
    })

    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("limit", show_limit))
    application.add_handler(CommandHandler("admin", admin_menu))
    application.add_handler(CallbackQueryHandler(callbacks))
    application.add_handler(MessageHandler(filters.Regex(r"^(🤖 AI Chat|🎨 AI Image|🧠 Models|📜 History|📊 My Limit|⚙ Settings|ℹ About)$"), main_menu))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, text_message))
    application.add_error_handler(error_handler)

    # Initialize durable SQLite storage before polling starts. Pending updates are kept.
    application.run_polling(drop_pending_updates=False, allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
