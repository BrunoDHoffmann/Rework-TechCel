from decimal import Decimal

from sqlalchemy.orm import Session

from . import models

# Categorias e itens iniciais, baseados nas peças mais comuns de uma
# assistência técnica de celulares, tablets e controles de videogame.
# Formato do item: (nome, quantidade, custo, venda)
SEED = [
    (
        "Baterias",
        [
            ("Bateria iPhone 11", 8, "45.00", "130.00"),
            ("Bateria Samsung Galaxy A20", 6, "35.00", "110.00"),
            ("Bateria iPad 7ª geração", 3, "90.00", "240.00"),
        ],
    ),
    (
        "Telas / Displays",
        [
            ("Tela iPhone 11 (Incell)", 4, "150.00", "380.00"),
            ("Tela Samsung Galaxy A10", 4, "120.00", "300.00"),
        ],
    ),
    (
        "Conectores de carga / Flex",
        [
            ("Conector de carga USB-C", 15, "12.00", "60.00"),
            ("Flex conector de carga iPhone 11", 10, "30.00", "90.00"),
            ("Conector micro-USB", 12, "8.00", "45.00"),
        ],
    ),
    (
        "Áudio e vibração",
        [
            ("Alto-falante (buzzer) iPhone 11", 8, "15.00", "55.00"),
            ("Microfone flex universal", 8, "10.00", "40.00"),
            ("Motor vibrador (vibracall)", 6, "9.00", "35.00"),
        ],
    ),
    (
        "Controles de videogame",
        [
            ("Módulo analógico (potenciômetro) PS4/PS5", 20, "8.00", "35.00"),
            ("Gatilho L2/R2 PS4", 10, "6.00", "30.00"),
            ("Membrana condutiva de borracha (controle)", 12, "5.00", "25.00"),
        ],
    ),
    (
        "Ferramentas e insumos",
        [
            ("Cola B-7000 (15ml)", 10, "12.00", "30.00"),
            ("Fita adesiva dupla face (rolo)", 10, "8.00", "20.00"),
            ("Kit de parafusos sortidos", 5, "10.00", "25.00"),
        ],
    ),
]


def seed_data(db: Session) -> None:
    """Insere categorias e itens padrão. É idempotente: cria apenas o que
    ainda não existe (comparando pelo nome)."""
    for cat_name, items in SEED:
        category = (
            db.query(models.Category).filter(models.Category.name == cat_name).first()
        )
        if not category:
            category = models.Category(name=cat_name)
            db.add(category)
            db.flush()

        for name, qty, cost, sale in items:
            exists = (
                db.query(models.Item).filter(models.Item.name == name).first()
            )
            if exists:
                continue
            db.add(
                models.Item(
                    name=name,
                    quantity=qty,
                    cost_price=Decimal(cost),
                    sale_price=Decimal(sale),
                    category_id=category.id,
                )
            )
    db.commit()
