# Telegram AI Bot

Production-oriented Telegram bot built with Python 3.12, `python-telegram-bot` v22+, LangChain and Groq.

## Features

- Persistent Reply Keyboard: AI chat, image generation, models, history, limits, settings and about.
- Per-user SQLite conversation history, model selection and daily quota. User data never shares a history.
- Last 20 chat messages are retained per user.
- Free quota: 15 requests/day. Premium quota: 100 requests/day.
- Inline model selection, a per-user **New Chat** action, and Back controls in every submenu.
- Async Groq calls and async image download with retries, timeout and response validation.
- Durable admin panel at `/admin`: users, statistics, premium changes and broadcasts.
- Structured logging, an application error handler and safe restart behavior (pending updates are preserved).

## Install and run

Use Python 3.12 and create a virtual environment:

```bash
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Edit `.env` and add real values for `TELEGRAM_TOKEN`, `GROQ_API_KEY`, and your numerical `ADMIN_IDS`.

```bash
python -m bot.main
```

## Project layout

```text
bot/
├── main.py       # startup, handlers and crash reporting
├── config.py     # environment configuration
├── keyboards.py  # Telegram UI layouts
├── handlers.py   # chat, image and menu workflows
├── ai.py         # LangChain/Groq service
├── image.py      # async image provider with retries
├── database.py   # SQLite persistence
├── admin.py      # protected admin panel
└── utils.py      # output and profile helpers
```

## Operational notes

- Do **not** commit `.env` or `bot_data.sqlite3`.
- The image service uses Pollinations' public image endpoint, so no extra image API key is required. If your deployment needs a vendor SLA, replace `ImageService.generate()` with the provider SDK while keeping its async interface.
- SQLite is suitable for one bot process. For horizontally scaled deployments, use PostgreSQL or another shared database.
