"""Groq/LangChain integration."""

import asyncio

from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_groq import ChatGroq


MODELS = {
    "1": ("llama-3.3-70b-versatile", "Llama 3.3 70B"),
    "2": ("llama-3.1-8b-instant", "Llama 3.1 8B"),
    "3": ("mixtral-8x7b-32768", "Mixtral"),
    "4": ("gemma2-9b-it", "Gemma2"),
}
DEFAULT_MODEL = MODELS["1"][0]
SYSTEM_PROMPT = "Sen foydali, do'stona yordamchisan. O'zbek tilida aniq, qisqa va Markdown bilan javob ber."


class AIService:
    def __init__(self, api_key: str) -> None:
        self.api_key = api_key

    async def reply(self, model: str, history: list[object], prompt: str) -> str:
        messages = [SystemMessage(content=SYSTEM_PROMPT), *history, HumanMessage(content=prompt)]
        client = ChatGroq(api_key=self.api_key, model=model, temperature=0.7, max_tokens=1024)
        response = await asyncio.to_thread(client.invoke, messages)
        return str(response.content)


def rows_to_messages(rows: list[object]) -> list[object]:
    messages: list[object] = []
    for row in rows:
        messages.append(HumanMessage(content=row["content"]) if row["role"] == "user" else AIMessage(content=row["content"]))
    return messages
