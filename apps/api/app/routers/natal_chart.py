from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import BirthProfileModel, NatalChartModel
from app.schemas.natal_chart import NatalChartCalculateRequest, NatalChartDetail, NatalChartResult
from app.services import build_natal_details, build_natal_summary

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


@router.get("/{chart_id}", response_model=NatalChartDetail)
def get_natal_chart(chart_id: int, db: Session = Depends(get_db)) -> NatalChartDetail:
    chart = db.query(NatalChartModel).filter(NatalChartModel.id == chart_id).first()
    if not chart:
        raise HTTPException(status_code=404, detail="Natal chart not found")

    profile = db.query(BirthProfileModel).filter(BirthProfileModel.id == chart.birth_profile_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Birth profile not found")

    details = build_natal_details(
        name=profile.name,
        birth_date=profile.birth_date,
        birth_time=profile.birth_time,
        birth_place=profile.birth_place,
    )

    return NatalChartDetail(
        id=chart.id,
        birth_profile_id=chart.birth_profile_id,
        summary=chart.summary,
        sun_sign=chart.sun_sign,
        interpretation=chart.interpretation,
        **details,
    )


@router.delete("/{chart_id}")
def delete_natal_chart(chart_id: int, db: Session = Depends(get_db)) -> dict[str, str]:
    chart = db.query(NatalChartModel).filter(NatalChartModel.id == chart_id).first()
    if not chart:
        raise HTTPException(status_code=404, detail="Natal chart not found")

    db.delete(chart)
    db.commit()
    return {"status": "deleted"}
