import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException

load_dotenv()

app = FastAPI()


@app.get("/")
async def root():
    return {
        "message": "Ignace.dev API - AI-Driven Web Systems",
        "memory_enabled": True,
        "storage": "local",
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
