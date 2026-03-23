from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import BirthProfileModel, NatalChartModel
from app.schemas.natal_chart import NatalChartCalculateRequest, NatalChartResult
from app.services import build_natal_summary

router = APIRouter(prefix="/natal-chart", tags=["natal-chart"])


@router.post("/calculate", response_model=NatalChartResult)
def calculate_natal_chart(payload: NatalChartCalculateRequest, db: Session = Depends(get_db)) -> NatalChartModel:
    profile = db.query(BirthProfileModel).filter(BirthProfileModel.id == payload.birth_profile_id).first()

    if not profile:
        raise HTTPException(status_code=404, detail="Birth profile not found")

    summary, sun_sign, interpretation = build_natal_summary(
        name=profile.name,
        birth_date=profile.birth_date,
        birth_place=profile.birth_place,
    )

    chart = NatalChartModel(
        birth_profile_id=profile.id,
        summary=summary,
        sun_sign=sun_sign,
        interpretation=interpretation,
    )
    db.add(chart)
    db.commit()
    db.refresh(chart)
    return chart


@router.get("", response_model=list[NatalChartResult])
def list_natal_charts(db: Session = Depends(get_db)) -> list[NatalChartModel]:
    return db.query(NatalChartModel).order_by(NatalChartModel.id.desc()).all()
