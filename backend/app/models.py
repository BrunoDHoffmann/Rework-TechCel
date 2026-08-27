from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
    func,
)
from sqlalchemy.orm import relationship

from .database import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False, unique=True)

    items = relationship("Item", back_populates="category")


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(160), nullable=False, index=True)
    quantity = Column(Integer, nullable=False, default=0)
    cost_price = Column(Numeric(10, 2), nullable=True)
    sale_price = Column(Numeric(10, 2), nullable=True)
    category_id = Column(
        Integer, ForeignKey("categories.id", ondelete="SET NULL"), nullable=True
    )

    category = relationship("Category", back_populates="items")


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String(255), nullable=False)
    client_name = Column(String(160), nullable=True)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)

    items = relationship(
        "ServiceItem", back_populates="service", cascade="all, delete-orphan"
    )


class ServiceItem(Base):
    __tablename__ = "service_items"

    id = Column(Integer, primary_key=True, index=True)
    service_id = Column(
        Integer, ForeignKey("services.id", ondelete="CASCADE"), nullable=False
    )
    item_id = Column(
        Integer, ForeignKey("items.id", ondelete="SET NULL"), nullable=True
    )
    item_name = Column(String(160), nullable=False)
    quantity_used = Column(Integer, nullable=False)
    unit_price = Column(Numeric(10, 2), nullable=True)

    service = relationship("Service", back_populates="items")
