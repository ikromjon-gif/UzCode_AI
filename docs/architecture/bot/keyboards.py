"""All Telegram keyboard layouts live in one place."""

from telegram import InlineKeyboardButton, InlineKeyboardMarkup, ReplyKeyboardMarkup


MAIN_MENU = ReplyKeyboardMarkup(
    [
        ["🤖 AI Chat", "🎨 AI Image"],
        ["🧠 Models", "📜 History"],
        ["📊 My Limit", "⚙ Settings"],
        ["ℹ About"],
    ],
    resize_keyboard=True,
    is_persistent=True,
)


def back_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup([[InlineKeyboardButton("⬅ Back", callback_data="back")]])


def chat_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        [
            [InlineKeyboardButton("🗑 New Chat", callback_data="new_chat")],
            [InlineKeyboardButton("⬅ Back", callback_data="back")],
        ]
    )


def models_keyboard(selected_model: str, models: dict[str, tuple[str, str]]) -> InlineKeyboardMarkup:
    buttons = []
    for key, (model_id, label) in models.items():
        prefix = "✅ " if model_id == selected_model else ""
        buttons.append([InlineKeyboardButton(prefix + label, callback_data=f"model:{key}")])
    buttons.append([InlineKeyboardButton("⬅ Back", callback_data="back")])
    return InlineKeyboardMarkup(buttons)


def settings_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        [
            [InlineKeyboardButton("🗑 New Chat", callback_data="new_chat")],
            [InlineKeyboardButton("🔄 Default model", callback_data="default_model")],
            [InlineKeyboardButton("⬅ Back", callback_data="back")],
        ]
    )


def admin_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        [
            [
                InlineKeyboardButton("👥 Users", callback_data="admin:users"),
                InlineKeyboardButton("📈 Statistics", callback_data="admin:stats"),
            ],
            [
                InlineKeyboardButton("➕ Add premium", callback_data="admin:add"),
                InlineKeyboardButton("➖ Remove premium", callback_data="admin:remove"),
            ],
            [InlineKeyboardButton("📣 Broadcast", callback_data="admin:broadcast")],
            [InlineKeyboardButton("⬅ Back", callback_data="back")],
        ]
    )
