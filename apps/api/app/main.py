from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import Base, engine
from app.routers.health import router as health_router
from app.routers.birth_profiles import router as birth_profiles_router
from app.routers.natal_chart import router as natal_chart_router


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
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
app.include_router(birth_profiles_router, prefix="/api")
app.include_router(natal_chart_router, prefix="/api")


@app.get("/")
def root() -> dict[str, str]:
    return {
        "service": "Astrology API",
        "status": "ok",
    }
