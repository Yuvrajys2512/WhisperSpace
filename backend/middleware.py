from fastapi import Request, HTTPException
import hashlib
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)

def get_ip_hash(request: Request):
    ip = request.client.host
    return hashlib.sha256(ip.encode()).hexdigest()

# Add this to main.py later
# app.state.limiter = limiter
# app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
