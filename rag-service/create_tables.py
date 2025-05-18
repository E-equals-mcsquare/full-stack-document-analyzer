# create_tables.py
from app.core.db import engine
from app.models import Base
import asyncio

async def init():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

asyncio.run(init())
