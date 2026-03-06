from sqlalchemy import Column, String, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from database import Base

class Whisper(Base):
    __tablename__ = "whispers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    content = Column(Text, nullable=False)
    mood = Column(String, nullable=True) # AI will fill this
    created_at = Column(DateTime, default=datetime.utcnow)
    ip_hash = Column(String, nullable=False)

    replies = relationship("Reply", back_populates="whisper", cascade="all, delete-orphan")

class Reply(Base):
    __tablename__ = "replies"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    whisper_id = Column(UUID(as_uuid=True), ForeignKey("whispers.id"), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    ip_hash = Column(String, nullable=False)

    whisper = relationship("Whisper", back_populates="replies")
