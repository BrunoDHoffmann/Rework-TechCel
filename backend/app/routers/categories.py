from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("", response_model=list[schemas.CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    return db.query(models.Category).order_by(models.Category.name).all()


@router.post("", response_model=schemas.CategoryOut, status_code=201)
def create_category(payload: schemas.CategoryCreate, db: Session = Depends(get_db)):
    category = models.Category(name=payload.name.strip())
    db.add(category)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="Categoria já existe")
    db.refresh(category)
    return category


@router.patch("/{category_id}", response_model=schemas.CategoryOut)
def rename_category(
    category_id: int, payload: schemas.CategoryUpdate, db: Session = Depends(get_db)
):
    category = db.get(models.Category, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")
    # Os itens vinculados referenciam a categoria por id, então o novo nome
    # passa a valer automaticamente para todos eles.
    category.name = payload.name.strip()
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="Já existe uma categoria com esse nome")
    db.refresh(category)
    return category


@router.delete("/{category_id}", status_code=204)
def delete_category(category_id: int, db: Session = Depends(get_db)):
    category = db.get(models.Category, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")
    # Itens vinculados ficam com category_id = NULL (ondelete SET NULL)
    db.delete(category)
    db.commit()
    return None
