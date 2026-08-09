"""Telegram + Groq AI bot.

Required environment variables:
  TELEGRAM_TOKEN=<your Telegram bot token>
  GROQ_API_KEY=<your Groq API key>
"""

import asyncio
import logging
import os
from collections import defaultdict
from datetime import date
from io import BytesIO
from urllib.parse import quote

import requests
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_groq import ChatGroq
from telegram import InputFile, Update
from telegram.constants import ChatAction
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters


TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

FREE_LIMIT = 15
PREMIUM_LIMIT = 100
PREMIUM_USERS: set[int] = set()

MODELS = {
    "1": ("llama-3.3-70b-versatile", "Llama 3.3 70B (Sifatli)"),
    "2": ("llama-3.1-8b-instant", "Llama 3.1 8B (Tez)"),
    "3": ("mixtral-8x7b-32768", "Mixtral 8x7B"),
    "4": ("gemma2-9b-it", "Gemma2 9B"),
}
DEFAULT_MODEL = MODELS["1"][0]

user_usage = defaultdict(lambda: {"date": None, "count": 0})
user_history = defaultdict(list)
user_model = defaultdict(lambda: DEFAULT_MODEL)

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)


def get_limit(user_id: int) -> int:
    return PREMIUM_LIMIT if user_id in PREMIUM_USERS else FREE_LIMIT


def check_and_use_limit(user_id: int) -> tuple[bool, int]:
    today = date.today()
    usage = user_usage[user_id]
    limit = get_limit(user_id)

    if usage["date"] != today:
        usage["date"] = today
        usage["count"] = 0

    if usage["count"] >= limit:
        return False, 0

    usage["count"] += 1
    return True, limit - usage["count"]


def get_remaining(user_id: int) -> int:
    usage = user_usage[user_id]
    if usage["date"] != date.today():
        return get_limit(user_id)
    return max(0, get_limit(user_id) - usage["count"])


def get_llm(model_name: str) -> ChatGroq:
    return ChatGroq(
        api_key=GROQ_API_KEY,
        model=model_name,
        temperature=0.7,
        max_tokens=1024,
    )


def download_image(prompt: str) -> BytesIO | None:
    url = (
        "https://image.pollinations.ai/prompt/"
        f"{quote(prompt)}?width=1024&height=1024&nologo=true"
    )
    response = requests.get(url, timeout=60)
    response.raise_for_status()
    image = BytesIO(response.content)
    image.name = "rasm.png"
    return image


async def generate_image(prompt: str) -> BytesIO | None:
    try:
        return await asyncio.to_thread(download_image, prompt)
    except requests.RequestException:
        logger.exception("Rasm yaratish so'rovi muvaffaqiyatsiz tugadi")
        return None


def get_image_prompt(message: str) -> str | None:
    prefixes = ("rasm:", "chiz:", "rasm chiz:", "draw:")
    normalized = message.lower()
    for prefix in prefixes:
        if normalized.startswith(prefix):
            return message[len(prefix):].strip()
    return None


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.message is None or update.effective_user is None:
        return

    user_id = update.effective_user.id
    limit = get_limit(user_id)
    status = "Premium" if user_id in PREMIUM_USERS else "Oddiy"
    await update.message.reply_text(
        "Salom! Men AI yordamchiman.\n\n"
        f"Holat: {status}\n"
        f"Bugungi limit: {get_remaining(user_id)}/{limit}\n\n"
        "Buyruqlar:\n"
        "/model — Model tanlash\n"
        "/history — Suhbat tarixini tozalash\n"
        "/limit — Qancha savol qolganini ko'rish\n\n"
        "Rasm yaratish: rasm: <tavsif>\n\n"
        "Savolingizni yozing 👇"
    )


async def show_limit(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.message is None or update.effective_user is None:
        return
    user_id = update.effective_user.id
    status = "Premium" if user_id in PREMIUM_USERS else "Oddiy"
    await update.message.reply_text(
        f"Holat: {status}\nQolgan savollar: {get_remaining(user_id)}/{get_limit(user_id)}"
    )


async def clear_history(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.message is None or update.effective_user is None:
        return
    user_history[update.effective_user.id].clear()
    await update.message.reply_text("Suhbat tarixi tozalandi.")


async def choose_model(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.message is None:
        return
    choices = "\n".join(f"{key}. {name}" for key, (_, name) in MODELS.items())
    await update.message.reply_text(f"Model tanlang:\n\n{choices}\n\nRaqamni yozing (1–4).")


async def handle_image_request(update: Update, prompt: str) -> None:
    if update.message is None:
        return
    if not prompt:
        await update.message.reply_text("Rasm uchun tavsif yozing. Masalan: rasm: O'zbekiston tog'lari")
        return

    await update.message.reply_text("Rasm chizilmoqda, biroz kuting...")
    image = await generate_image(prompt)
    if image is None:
        await update.message.reply_text("Rasm yaratib bo'lmadi. Qayta urinib ko'ring.")
        return

    await update.message.reply_photo(
        photo=InputFile(image, filename="rasm.png"),
        caption=f"Prompt: {prompt}",
    )


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.message is None or update.message.text is None or update.effective_user is None:
        return

    user_id = update.effective_user.id
    message = update.message.text.strip()
    if not message:
        return

    if message in MODELS:
        model_id, model_label = MODELS[message]
        user_model[user_id] = model_id
        await update.message.reply_text(f"Model o'zgartirildi: {model_label}")
        return

    allowed, remaining = check_and_use_limit(user_id)
    if not allowed:
        await update.message.reply_text(
            f"Bugungi limittingiz tugadi ({get_limit(user_id)} ta). Ertaga qayta urinib ko'ring."
        )
        return

    image_prompt = get_image_prompt(message)
    if image_prompt is not None:
        await handle_image_request(update, image_prompt)
        return

    try:
        await context.bot.send_chat_action(update.effective_chat.id, ChatAction.TYPING)
        history = user_history[user_id]
        messages = [
            SystemMessage(
                content=(
                    "Sen foydali, do'stona va o'zbek tilida aniq javob beradigan "
                    "yordamchisan. Qisqa va tushunarli gapir."
                )
            ),
            *history,
            HumanMessage(content=message),
        ]
        response = await asyncio.to_thread(get_llm(user_model[user_id]).invoke, messages)
        reply = str(response.content)

        history.extend([HumanMessage(content=message), AIMessage(content=reply)])
        if len(history) > 20:
            user_history[user_id] = history[-20:]

        await update.message.reply_text(f"{reply}\n\n————————\nQolgan savollar: {remaining}")
    except Exception:
        logger.exception("AI javobini yaratishda xato")
        await update.message.reply_text("Xatolik yuz berdi. Keyinroq urinib ko'ring.")


def main() -> None:
    if not TELEGRAM_TOKEN or not GROQ_API_KEY:
        raise RuntimeError("TELEGRAM_TOKEN va GROQ_API_KEY muhit o'zgaruvchilarini kiriting.")

    app = Application.builder().token(TELEGRAM_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("limit", show_limit))
    app.add_handler(CommandHandler("history", clear_history))
    app.add_handler(CommandHandler("model", choose_model))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    logger.info("Bot ishga tushdi")
    app.run_polling()


if __name__ == "__main__":
    main()
