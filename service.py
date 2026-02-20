from sqlalchemy.orm import Session
import models
import schemas
from typing import List, Optional

def create_request(db: Session, request: schemas.RequestCreate):
    # Compatibility between Pydantic V1 and V2
    request_data = request.model_dump() if hasattr(request, "model_dump") else request.dict()
    db_request = models.ServiceRequest(**request_data)
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
    return db_request

def get_requests(
    db: Session, 
    category: Optional[str] = None, 
    status: Optional[str] = None, 
    priority: Optional[str] = None
) -> List[models.ServiceRequest]:
    query = db.query(models.ServiceRequest)
    if category:
        query = query.filter(models.ServiceRequest.category == category)
    if status:
        query = query.filter(models.ServiceRequest.status == status)
    if priority:
        query = query.filter(models.ServiceRequest.priority == priority)
    return query.all()

def update_request_status(db: Session, request_id: int, status: str):
    db_request = db.query(models.ServiceRequest).filter(models.ServiceRequest.id == request_id).first()
    if not db_request:
        return None
        
    # Enforce transitions: Open -> In Progress -> Resolved
    current_status = db_request.status
    
    # Simple transition check
    if current_status == "Open" and status != "In Progress":
        raise ValueError("Can only move from Open to In Progress")
    if current_status == "In Progress" and status != "Resolved":
        raise ValueError("Can only move from In Progress to Resolved")
    if current_status == "Resolved":
        raise ValueError("Cannot move from Resolved status")

    db_request.status = status
    db.commit()
    db.refresh(db_request)
    return db_request
