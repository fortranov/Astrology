from pydantic import BaseModel, Field


class BirthProfileCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    birth_date: str = Field(..., description="YYYY-MM-DD")
    birth_time: str | None = Field(default=None, description="HH:MM")
    birth_place: str = Field(..., min_length=1, max_length=255)


class BirthProfile(BirthProfileCreate):
    id: int
