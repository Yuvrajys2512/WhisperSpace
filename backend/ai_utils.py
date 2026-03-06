from transformers import pipeline
import torch

# Use a lightweight sentiment model
# For mood classification, we might need a more specific model or map sentiment to moods
# For now, let's use a zero-shot-classification model which is versatile
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli", device=-1)

MOOD_CATEGORIES = ["Sad", "Calm", "Lonely", "Stressed", "Hopeless", "Hopeful", "Neutral"]

def classify_mood(content: str):
    try:
        result = classifier(content, candidate_labels=MOOD_CATEGORIES)
        # If confidence is low, assign "Neutral"
        if result['scores'][0] < 0.4:
            return "Neutral"
        return result['labels'][0]
    except Exception as e:
        print(f"Error in mood classification: {e}")
        return "Neutral"

# Simple toxicity filter
BAD_WORDS = ["hate", "kill", "threat", "violence"] # This should be expanded or use a model

def is_toxic(content: str):
    content_lower = content.lower()
    for word in BAD_WORDS:
        if word in content_lower:
            return True
    return False
