from pydantic import BaseModel, EmailStr, ConfigDict, Field


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    email: EmailStr
    is_admin: bool


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    is_admin: bool
    is_active: bool

    model_config = ConfigDict(from_attributes=True)
