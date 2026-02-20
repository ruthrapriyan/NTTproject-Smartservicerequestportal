from sqlalchemy import Column, Integer, String, DateTime, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
import datetime

Base = declarative_base()

class ServiceRequest(Base):
    __tablename__ = "service_requests"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    category = Column(String(50), nullable=False) # IT/Admin/Facilities
    description = Column(String(1000), nullable=False)
    priority = Column(String(50), nullable=False) # Low/Medium/High
    status = Column(String(50), default="Open") # Open/In Progress/Resolved
    requester_name = Column(String(255), nullable=False)
    requester_email = Column(String(255), nullable=False)
    created_at = Column(DateTime, server_default=func.now())
