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


class NatalChartDetail(NatalChartResult):
    moon_sign: str
    rising_sign: str
    dominant_element: str
    strengths: list[str]
    growth_zones: list[str]
    love_reading: str
    career_reading: str
    purpose_reading: str
    recommendations: list[str]
