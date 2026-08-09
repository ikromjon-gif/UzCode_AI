"""User-facing menu, callback and message handlers."""

import logging

from telegram import InputFile, Update
from telegram.constants import ChatAction
from telegram.ext import ContextTypes

from .admin import handle_admin_callback, process_admin_input
from .ai import MODELS, rows_to_messages
from .keyboards import MAIN_MENU, back_keyboard, chat_keyboard, models_keyboard, settings_keyboard
from .utils import ensure_user, reply_markdown


logger = logging.getLogger(__name__)


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.message is None or not await ensure_user(update, context):
        return
    await update.message.reply_text(
        "*Salom!* Men sizning AI yordamchingizman. Quyidagi menyudan xizmatni tanlang.",
        parse_mode="Markdown", reply_markup=MAIN_MENU,
    )


async def show_limit(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.message is None or update.effective_user is None or not await ensure_user(update, context):
        return
    db = context.application.bot_data["db"]
    user = await db.get_user(update.effective_user.id)
    settings = context.application.bot_data["settings"]
    limit = settings.premium_limit if user["premium"] else settings.free_limit
    used = await db.usage(update.effective_user.id)
    await update.message.reply_text(f"📊 *My Limit*\n\nIshlatilgan: *{used}/{limit}*\nQolgan: *{max(0, limit - used)}*", parse_mode="Markdown", reply_markup=MAIN_MENU)


async def main_menu(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.message is None or update.message.text is None or update.effective_user is None:
        return
    if not await ensure_user(update, context):
        return
    text = update.message.text
    db = context.application.bot_data["db"]
    user_id = update.effective_user.id
    user = await db.get_user(user_id)

    if text == "🤖 AI Chat":
        await db.set_mode(user_id, "chat")
        await update.message.reply_text("*AI Chat*\n\nSavolingizni yozing.", parse_mode="Markdown", reply_markup=chat_keyboard())
    elif text == "🎨 AI Image":
        await db.set_mode(user_id, "image")
        await update.message.reply_text("*Describe the image.*\n\nRasm tavsifini yuboring.", parse_mode="Markdown", reply_markup=back_keyboard())
    elif text == "🧠 Models":
        await update.message.reply_text("*Modelni tanlang:*", parse_mode="Markdown", reply_markup=models_keyboard(user["model"], MODELS))
    elif text == "📜 History":
        rows = await db.history(user_id)
        if not rows:
            await update.message.reply_text("📜 Tarix hali bo'sh.", reply_markup=back_keyboard())
        else:
            preview = ["*Oxirgi suhbatlar:*"]
            for row in rows[-10:]:
                speaker = "👤" if row["role"] == "user" else "🤖"
                preview.append(f"{speaker} {row['content'][:250]}")
            await reply_markdown(update.message, "\n\n".join(preview), reply_markup=chat_keyboard())
    elif text == "📊 My Limit":
        await show_limit(update, context)
    elif text == "⚙ Settings":
        await update.message.reply_text("*Settings*", parse_mode="Markdown", reply_markup=settings_keyboard())
    elif text == "ℹ About":
        await update.message.reply_text("*AI Bot*\n\nGroq va LangChain asosidagi yordamchi. Har bir foydalanuvchi uchun tarix va limit alohida saqlanadi.", parse_mode="Markdown", reply_markup=back_keyboard())
    else:
        await process_content(update, context, text, user)


async def callbacks(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    if query is None or update.effective_user is None or not await ensure_user(update, context):
        return
    await query.answer()
    data = query.data or ""
    db = context.application.bot_data["db"]
    user_id = update.effective_user.id

    if data.startswith("admin:"):
        await handle_admin_callback(update, context, data.split(":", 1)[1])
    elif data == "back":
        await db.set_mode(user_id, "chat")
        await query.edit_message_text("Bosh menyu ochildi.")
        await query.message.reply_text("Kerakli xizmatni tanlang.", reply_markup=MAIN_MENU)
    elif data == "new_chat":
        await db.clear_history(user_id)
        await db.set_mode(user_id, "chat")
        await query.edit_message_text("🗑 Suhbat tarixi tozalandi. Yangi savol yuboring.", reply_markup=chat_keyboard())
    elif data == "default_model":
        await db.set_model(user_id, context.application.bot_data["default_model"])
        await query.edit_message_text("Standart model tiklandi.", reply_markup=settings_keyboard())
    elif data.startswith("model:"):
        key = data.split(":", 1)[1]
        if key in MODELS:
            model_id, label = MODELS[key]
            await db.set_model(user_id, model_id)
            await query.edit_message_text(f"✅ Tanlandi: *{label}*", parse_mode="Markdown", reply_markup=models_keyboard(model_id, MODELS))


async def text_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.message is None or update.message.text is None or update.effective_user is None or not await ensure_user(update, context):
        return
    db = context.application.bot_data["db"]
    user = await db.get_user(update.effective_user.id)
    if await process_admin_input(update, context, user["mode"], update.message.text):
        return
    await process_content(update, context, update.message.text, user)


async def process_content(update: Update, context: ContextTypes.DEFAULT_TYPE, text: str, user: object) -> None:
    if update.message is None or update.effective_user is None:
        return
    db = context.application.bot_data["db"]
    settings = context.application.bot_data["settings"]
    user_id = update.effective_user.id
    limit = settings.premium_limit if user["premium"] else settings.free_limit
    allowed, remaining = await db.consume_request(user_id, limit)
    if not allowed:
        await update.message.reply_text(f"Bugungi limit tugadi (*{limit} ta*). Ertaga qayta urinib ko'ring.", parse_mode="Markdown", reply_markup=MAIN_MENU)
        return

    if user["mode"] == "image":
        await generate_image(update, context, text, remaining)
    else:
        await generate_chat(update, context, text, user["model"], remaining)


async def generate_chat(update: Update, context: ContextTypes.DEFAULT_TYPE, prompt: str, model: str, remaining: int) -> None:
    if update.message is None or update.effective_user is None:
        return
    db = context.application.bot_data["db"]
    try:
        await context.bot.send_chat_action(update.effective_chat.id, ChatAction.TYPING)
        history = rows_to_messages(await db.history(update.effective_user.id))
        answer = await context.application.bot_data["ai"].reply(model, history, prompt)
        await db.add_exchange(update.effective_user.id, prompt, answer)
        await reply_markdown(update.message, f"{answer}\n\n_📊 Qolgan limit: {remaining}_", reply_markup=chat_keyboard())
    except Exception:
        logger.exception("Chat generation failed")
        await update.message.reply_text("Javob yaratishda xatolik yuz berdi. Keyinroq qayta urinib ko'ring.", reply_markup=chat_keyboard())


async def generate_image(update: Update, context: ContextTypes.DEFAULT_TYPE, prompt: str, remaining: int) -> None:
    if update.message is None:
        return
    try:
        await context.bot.send_chat_action(update.effective_chat.id, ChatAction.UPLOAD_PHOTO)
        loading = await update.message.reply_text("🎨 Rasm yaratilmoqda, biroz kuting...")
        image = await context.application.bot_data["image"].generate(prompt)
        await update.message.reply_photo(InputFile(image, filename="ai_image.png"), caption=f"🎨 *Prompt:* {prompt}\n📊 Qolgan limit: {remaining}", parse_mode="Markdown", reply_markup=back_keyboard())
        await loading.delete()
    except Exception:
        logger.exception("Image generation failed")
        await update.message.reply_text("Rasm yaratib bo'lmadi. Iltimos, qisqaroq tavsif bilan qayta urinib ko'ring.", reply_markup=back_keyboard())
