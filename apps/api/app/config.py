import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    database_url: str = os.getenv("DATABASE_URL", "sqlite:////data/astrology.db")
    cors_allow_origins: tuple[str, ...] = tuple(
        origin.strip()
        for origin in os.getenv("CORS_ALLOW_ORIGINS", "*").split(",")
        if origin.strip()
    ) or ("*",)
    jwt_secret: str = os.getenv("JWT_SECRET", "astrology-dev-secret-change-me")
    jwt_algorithm: str = os.getenv("JWT_ALGORITHM", "HS256")
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "10080"))
    default_admin_email: str = os.getenv("DEFAULT_ADMIN_EMAIL", "abramov.yu.v@gmail.com")
    default_admin_password: str = os.getenv("DEFAULT_ADMIN_PASSWORD", "3tuka2puka")

    @property
    def database_backend(self) -> str:
        if self.database_url.startswith("postgresql"):
            return "postgresql"
        if self.database_url.startswith("sqlite"):
            return "sqlite"
        return "custom"


settings = Settings()
