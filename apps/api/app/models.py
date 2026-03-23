from sqlalchemy import Boolean, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class BirthProfileModel(Base):
    __tablename__ = "birth_profiles"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    birth_date: Mapped[str] = mapped_column(String(10), nullable=False)
    birth_time: Mapped[str | None] = mapped_column(String(5), nullable=True)
    birth_place: Mapped[str] = mapped_column(String(255), nullable=False)


class NatalChartModel(Base):
    __tablename__ = "natal_charts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    birth_profile_id: Mapped[int] = mapped_column(ForeignKey("birth_profiles.id"), nullable=False, index=True)
    summary: Mapped[str] = mapped_column(String(255), nullable=False)
    sun_sign: Mapped[str] = mapped_column(String(40), nullable=False)
    interpretation: Mapped[str] = mapped_column(Text, nullable=False)


class UserModel(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    is_admin: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)


class AppSettingsModel(Base):
    __tablename__ = "app_settings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    google_auth_enabled: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
