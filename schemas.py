from pydantic import BaseModel
from typing import Optional, Literal
from datetime import datetime

class RequestBase(BaseModel):
    title: str
    category: Literal["IT", "Admin", "Facilities"]
    description: str
    priority: Literal["Low", "Medium", "High"]
    requester_name: str
    requester_email: str

class RequestCreate(RequestBase):
    pass

class RequestUpdate(BaseModel):
    status: Literal["Open", "In Progress", "Resolved"]

class RequestResponse(RequestBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True # Pydantic V2
        orm_mode = True        # Pydantic V1

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
