from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload

from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/items", tags=["items"])


@router.get("", response_model=list[schemas.ItemOut])
def list_items(
    search: str | None = Query(None, description="Filtra por nome do item"),
    category_id: int | None = Query(None, description="Filtra por categoria"),
    db: Session = Depends(get_db),
):
    query = db.query(models.Item).options(joinedload(models.Item.category))
    if search:
        query = query.filter(models.Item.name.ilike(f"%{search.strip()}%"))
    if category_id is not None:
        query = query.filter(models.Item.category_id == category_id)
    return query.order_by(models.Item.name).all()


def _validate_category(db: Session, category_id: int | None):
    if category_id is not None and not db.get(models.Category, category_id):
        raise HTTPException(status_code=400, detail="Categoria inválida")


@router.post("", response_model=schemas.ItemOut, status_code=201)
def create_item(payload: schemas.ItemCreate, db: Session = Depends(get_db)):
    _validate_category(db, payload.category_id)
    item = models.Item(**payload.model_dump())
    item.name = item.name.strip()
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.patch("/{item_id}", response_model=schemas.ItemOut)
def update_item(
    item_id: int, payload: schemas.ItemUpdate, db: Session = Depends(get_db)
):
    item = db.get(models.Item, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item não encontrado")

    data = payload.model_dump(exclude_unset=True)
    if "category_id" in data:
        _validate_category(db, data["category_id"])
    if "name" in data and data["name"] is not None:
        data["name"] = data["name"].strip()

    for key, value in data.items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item


@router.patch("/{item_id}/quantity", response_model=schemas.ItemOut)
def adjust_quantity(
    item_id: int, payload: schemas.QuantityAdjust, db: Session = Depends(get_db)
):
    item = db.get(models.Item, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item não encontrado")

    new_quantity = item.quantity + payload.delta
    if new_quantity < 0:
        raise HTTPException(status_code=400, detail="Quantidade não pode ser negativa")
    item.quantity = new_quantity
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}", status_code=204)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    item = db.get(models.Item, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    db.delete(item)
    db.commit()
    return None
