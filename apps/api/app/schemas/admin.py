from pydantic import BaseModel, ConfigDict


class AuthSettingsResponse(BaseModel):
    google_auth_enabled: bool

    model_config = ConfigDict(from_attributes=True)


class UpdateAuthSettingsRequest(BaseModel):
    google_auth_enabled: bool
