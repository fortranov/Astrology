from pydantic import BaseModel, ConfigDict


class NatalChartCalculateRequest(BaseModel):
    birth_profile_id: int


class NatalChartResult(BaseModel):
    id: int
    birth_profile_id: int
    summary: str
    sun_sign: str
    interpretation: str

    model_config = ConfigDict(from_attributes=True)
