"""Async image generation with retries and response validation."""

import asyncio
from io import BytesIO
from urllib.parse import quote

import httpx


class ImageService:
    """Pollinations' public image endpoint needs no additional secret."""

    async def generate(self, prompt: str) -> BytesIO:
        url = f"https://image.pollinations.ai/prompt/{quote(prompt)}?width=1024&height=1024&nologo=true"
        timeout = httpx.Timeout(90.0, connect=15.0)
        last_error: Exception | None = None
        async with httpx.AsyncClient(timeout=timeout, follow_redirects=True) as client:
            for attempt in range(3):
                try:
                    response = await client.get(url)
                    response.raise_for_status()
                    content_type = response.headers.get("content-type", "")
                    if not content_type.startswith("image/") or not response.content:
                        raise ValueError("Image provider returned a non-image response")
                    image = BytesIO(response.content)
                    image.name = "ai_image.png"
                    return image
                except (httpx.HTTPError, ValueError) as error:
                    last_error = error
                    if attempt < 2:
                        await asyncio.sleep(2 ** attempt)
        raise RuntimeError("Image generation failed") from last_error
