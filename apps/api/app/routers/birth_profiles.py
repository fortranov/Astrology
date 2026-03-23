from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import BirthProfileModel
from app.schemas.birth_profile import BirthProfile, BirthProfileCreate

router = APIRouter(prefix="/birth-profiles", tags=["birth-profiles"])


@router.get("", response_model=list[BirthProfile])
def list_birth_profiles(db: Session = Depends(get_db)) -> list[BirthProfileModel]:
    return db.query(BirthProfileModel).order_by(BirthProfileModel.id.desc()).all()


@router.post("", response_model=BirthProfile)
def create_birth_profile(payload: BirthProfileCreate, db: Session = Depends(get_db)) -> BirthProfileModel:
    profile = BirthProfileModel(**payload.model_dump())
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile
