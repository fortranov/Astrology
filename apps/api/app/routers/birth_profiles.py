from fastapi import APIRouter

from app.schemas.birth_profile import BirthProfile, BirthProfileCreate

router = APIRouter(prefix="/birth-profiles", tags=["birth-profiles"])

_fake_db: list[BirthProfile] = []


@router.get("", response_model=list[BirthProfile])
def list_birth_profiles() -> list[BirthProfile]:
    return _fake_db


@router.post("", response_model=BirthProfile)
def create_birth_profile(payload: BirthProfileCreate) -> BirthProfile:
    profile = BirthProfile(id=len(_fake_db) + 1, **payload.model_dump())
    _fake_db.append(profile)
    return profile
