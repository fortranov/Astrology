from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class BirthProfileModel(Base):
    __tablename__ = "birth_profiles"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    birth_date: Mapped[str] = mapped_column(String(10), nullable=False)
    birth_time: Mapped[str | None] = mapped_column(String(5), nullable=True)
    birth_place: Mapped[str] = mapped_column(String(255), nullable=False)
