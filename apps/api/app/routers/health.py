from fastapi import APIRouter
from sqlalchemy import text

from app.config import settings
from app.database import SessionLocal

router = APIRouter(tags=["health"])


@router.get("/health")
def health() -> dict[str, str]:
    return {
        "status": "ok",
        "database_backend": settings.database_backend,
    }


@router.get("/health/db")
def health_db() -> dict[str, str]:
    db = SessionLocal()
    try:
        db.execute(text("SELECT 1"))
        return {
            "status": "ok",
            "database": "reachable",
            "database_backend": settings.database_backend,
        }
    finally:
        db.close()
