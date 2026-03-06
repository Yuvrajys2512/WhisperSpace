from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime
from typing import List, Optional

class ReplyBase(BaseModel):
    content: str = Field(..., max_length=500)

class ReplyCreate(ReplyBase):
    pass

class Reply(ReplyBase):
    id: UUID
    whisper_id: UUID
    created_at: datetime

    class Config:
        orm_mode = True

class WhisperBase(BaseModel):
    content: str = Field(..., max_length=500)

class WhisperCreate(WhisperBase):
    pass

class Whisper(WhisperBase):
    id: UUID
    mood: Optional[str] = None
    created_at: datetime
    replies: List[Reply] = []

    class Config:
        orm_mode = True
