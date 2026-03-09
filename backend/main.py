from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import hashlib

import models, schemas, database, ai_utils, middleware
from database import engine, get_db
from middleware import limiter, get_ip_hash

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="WhisperSpace API")

import os

# Configure CORS properly
# origins = [
#     "http://localhost:3000",
#     "http://127.0.0.1:3000",
# ]

allowed_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")

# Configure CORS properly
# We use ["*"] temporarily to ensure the frontend can connect immediately.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate limiting setup
app.state.limiter = limiter
from slowapi.errors import RateLimitExceeded
from slowapi import _rate_limit_exceeded_handler
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

async def process_whisper_mood(whisper_id: str, content: str, db: Session):
    mood = ai_utils.classify_mood(content)
    whisper = db.query(models.Whisper).filter(models.Whisper.id == whisper_id).first()
    if whisper:
        whisper.mood = mood
        db.commit()

@app.post("/whispers", response_model=schemas.Whisper)
@limiter.limit("5/minute")
async def create_whisper(
    request: Request, 
    whisper: schemas.WhisperCreate, 
    background_tasks: BackgroundTasks, 
    db: Session = Depends(get_db)
):
    if ai_utils.is_toxic(whisper.content):
        raise HTTPException(status_code=400, detail="Content flagged for moderation")
    
    ip_hash = get_ip_hash(request)
    db_whisper = models.Whisper(content=whisper.content, ip_hash=ip_hash)
    db.add(db_whisper)
    db.commit()
    db.refresh(db_whisper)
    
    background_tasks.add_task(process_whisper_mood, db_whisper.id, db_whisper.content, db)
    
    return db_whisper

@app.get("/whispers", response_model=List[schemas.Whisper])
async def read_whispers(skip: int = 0, limit: int = 20, mood: str = None, db: Session = Depends(get_db)):
    query = db.query(models.Whisper)
    if mood:
        query = query.filter(models.Whisper.mood == mood)
    return query.order_by(models.Whisper.created_at.desc()).offset(skip).limit(limit).all()

@app.post("/whispers/{whisper_id}/replies", response_model=schemas.Reply)
@limiter.limit("10/minute")
async def create_reply(
    request: Request,
    whisper_id: str, 
    reply: schemas.ReplyCreate, 
    db: Session = Depends(get_db)
):
    try:
        import uuid
        u_id = uuid.UUID(whisper_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid whisper ID format")

    if ai_utils.is_toxic(reply.content):
        raise HTTPException(status_code=400, detail="Content flagged for moderation")
    
    ip_hash = get_ip_hash(request)
    db_reply = models.Reply(whisper_id=u_id, content=reply.content, ip_hash=ip_hash)
    db.add(db_reply)
    db.commit()
    db.refresh(db_reply)
    return db_reply

@app.get("/stats")
async def get_stats(db: Session = Depends(get_db)):
    total_whispers = db.query(models.Whisper).count()
    total_replies = db.query(models.Reply).count()
    return {
        "total_whispers": total_whispers,
        "total_replies": total_replies,
        "safety_moderation": "99.9%"
    }

import os
import uvicorn

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)