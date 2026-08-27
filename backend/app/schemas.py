from datetime import datetime
from decimal import Decimal
from typing import List, Optional

from pydantic import BaseModel, ConfigDict, Field


# ---------- Categorias ----------
class CategoryBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(CategoryBase):
    pass


class CategoryOut(CategoryBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


# ---------- Itens ----------
class ItemBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=160)
    quantity: int = Field(0, ge=0)
    cost_price: Optional[Decimal] = None
    sale_price: Optional[Decimal] = None
    category_id: Optional[int] = None


class ItemCreate(ItemBase):
    pass


class ItemUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=160)
    quantity: Optional[int] = Field(None, ge=0)
    cost_price: Optional[Decimal] = None
    sale_price: Optional[Decimal] = None
    category_id: Optional[int] = None


class QuantityAdjust(BaseModel):
    # valor positivo soma, negativo subtrai
    delta: int


class ItemOut(ItemBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    category: Optional[CategoryOut] = None


# ---------- Manutenções / Serviços ----------
class ServiceItemInput(BaseModel):
    item_id: int
    quantity_used: int = Field(..., gt=0)


class ServiceCreate(BaseModel):
    description: str = Field(..., min_length=1, max_length=255)
    client_name: Optional[str] = Field(None, max_length=160)
    items: List[ServiceItemInput]


class ServiceItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    item_id: Optional[int]
    item_name: str
    quantity_used: int
    unit_price: Optional[Decimal] = None


class ServiceOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    description: str
    client_name: Optional[str] = None
    created_at: datetime
    items: List[ServiceItemOut]
