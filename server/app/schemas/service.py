from pydantic import BaseModel
from datetime import datetime

class ServiceBase(BaseModel):
    icon: str
    title: str
    description: str

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(ServiceBase):
    pass

class ServiceResponse(ServiceBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
