from textblob import TextBlob

# Use TextBlob for lightweight mood classification
# This replaces the 7.5GB transformers/torch setup with a few MBs
def classify_mood(content: str):
    try:
        analysis = TextBlob(content)
        sentiment = analysis.sentiment.polarity
        
        # Map sentiment scores to moods
        if sentiment > 0.5:
            return "Hopeful"
        elif sentiment > 0.1:
            return "Calm"
        elif sentiment < -0.5:
            return "Hopeless"
        elif sentiment < -0.1:
            return "Sad"
        else:
            # Check for specific keywords for more variety
            content_lower = content.lower()
            if "lonely" in content_lower or "alone" in content_lower:
                return "Lonely"
            if "stress" in content_lower or "anxious" in content_lower:
                return "Stressed"
            return "Neutral"
    except Exception as e:
        print(f"Error in mood classification: {e}")
        return "Neutral"

# Simple toxicity filter
BAD_WORDS = ["hate", "kill", "threat", "violence", "stupid", "idiot"] 

def is_toxic(content: str):
    content_lower = content.lower()
    for word in BAD_WORDS:
        if word in content_lower:
            return True
    return False
