from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload

from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/services", tags=["services"])


@router.get("", response_model=list[schemas.ServiceOut])
def list_services(db: Session = Depends(get_db)):
    return (
        db.query(models.Service)
        .options(joinedload(models.Service.items))
        .order_by(models.Service.created_at.desc())
        .all()
    )


@router.post("", response_model=schemas.ServiceOut, status_code=201)
def create_service(payload: schemas.ServiceCreate, db: Session = Depends(get_db)):
    if not payload.items:
        raise HTTPException(
            status_code=400, detail="Informe ao menos um item para a manutenção"
        )

    # Consolida itens repetidos e valida estoque antes de gravar
    consolidated: dict[int, int] = {}
    for entry in payload.items:
        consolidated[entry.item_id] = consolidated.get(entry.item_id, 0) + entry.quantity_used

    client_name = payload.client_name.strip() if payload.client_name else None
    service = models.Service(
        description=payload.description.strip(),
        client_name=client_name or None,
    )

    for item_id, qty in consolidated.items():
        item = db.get(models.Item, item_id)
        if not item:
            raise HTTPException(
                status_code=404, detail=f"Item {item_id} não encontrado"
            )
        if item.quantity < qty:
            raise HTTPException(
                status_code=400,
                detail=f"Estoque insuficiente para '{item.name}' "
                f"(disponível: {item.quantity}, solicitado: {qty})",
            )
        item.quantity -= qty
        service.items.append(
            models.ServiceItem(
                item_id=item.id,
                item_name=item.name,
                quantity_used=qty,
                unit_price=item.sale_price,
            )
        )

    db.add(service)
    db.commit()
    db.refresh(service)
    return service


@router.delete("/{service_id}", status_code=204)
def delete_service(
    service_id: int,
    restore_stock: bool = Query(
        False, description="Se verdadeiro, devolve os itens usados ao estoque"
    ),
    db: Session = Depends(get_db),
):
    service = db.get(models.Service, service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Manutenção não encontrada")

    if restore_stock:
        for si in service.items:
            if si.item_id is None:
                continue  # item foi excluído do cadastro; não há para onde devolver
            item = db.get(models.Item, si.item_id)
            if item:
                item.quantity += si.quantity_used

    db.delete(service)
    db.commit()
    return None
