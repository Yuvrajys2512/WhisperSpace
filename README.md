# WhisperSpace 🤫

An anonymous emotional support platform built with FastAPI, Next.js, and AI mood classification.

## 🎯 Features
- **Anonymous Whispers**: Post what's on your mind.
- **AI Mood Analysis**: Automatic emotional category assignment (Sad, Calm, Lonely, etc.).
- **Supportive Replies**: Connect with others through kindness.
- **Premium Design**: Dark theme with glassmorphism and smooth animations.
- **Safety First**: Rate limiting and toxicity filtering.

## 🛠 Tech Stack
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL, HuggingFace Transformers.
- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion.
- **DevOps**: Docker, Docker Compose.

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js (for local dev)
- Python 3.9+ (for local dev)

### Run with Docker (Recommended)
```bash
docker-compose up --build
```
Access the app at `http://localhost:3000`.

### Local Development

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate # or venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🛡 License
MIT
