from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import require_admin
from app.models import AppSettingsModel, UserModel
from app.schemas.admin import AuthSettingsResponse, UpdateAuthSettingsRequest

router = APIRouter(prefix="/admin", tags=["admin"])


def get_or_create_settings(db: Session) -> AppSettingsModel:
    settings = db.query(AppSettingsModel).first()
    if settings:
        return settings

    settings = AppSettingsModel(google_auth_enabled=False)
    db.add(settings)
    db.commit()
    db.refresh(settings)
    return settings


@router.get("/auth-settings", response_model=AuthSettingsResponse)
def get_auth_settings(_: UserModel = Depends(require_admin), db: Session = Depends(get_db)) -> AppSettingsModel:
    return get_or_create_settings(db)


@router.patch("/auth-settings", response_model=AuthSettingsResponse)
def update_auth_settings(
    payload: UpdateAuthSettingsRequest,
    _: UserModel = Depends(require_admin),
    db: Session = Depends(get_db),
) -> AppSettingsModel:
    settings = get_or_create_settings(db)
    settings.google_auth_enabled = payload.google_auth_enabled
    db.add(settings)
    db.commit()
    db.refresh(settings)
    return settings
