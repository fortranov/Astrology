from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import Base, engine
from app.models import AppSettingsModel, UserModel
from app.routers.admin import router as admin_router
from app.routers.auth import router as auth_router
from app.routers.health import router as health_router
from app.routers.birth_profiles import router as birth_profiles_router
from app.routers.natal_chart import router as natal_chart_router
from app.security import hash_password


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)

    from app.database import SessionLocal

    db = SessionLocal()
    try:
        admin = db.query(UserModel).filter(UserModel.email == settings.default_admin_email).first()
        if not admin:
            admin = UserModel(
                email=settings.default_admin_email,
                password_hash=hash_password(settings.default_admin_password),
                is_admin=True,
                is_active=True,
            )
            db.add(admin)

        auth_settings = db.query(AppSettingsModel).first()
        if not auth_settings:
            db.add(AppSettingsModel(google_auth_enabled=False))

        db.commit()
    finally:
        db.close()

    yield


app = FastAPI(
    title="Astrology API",
    version="0.1.0",
    description="Backend API for astrology and tarot service",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(settings.cors_allow_origins),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
app.include_router(admin_router, prefix="/api")
app.include_router(birth_profiles_router, prefix="/api")
app.include_router(natal_chart_router, prefix="/api")


@app.get("/")
def root() -> dict[str, str]:
    return {
        "service": "Astrology API",
        "status": "ok",
    }
