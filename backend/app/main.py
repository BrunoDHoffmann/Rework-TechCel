from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models
from .database import Base, SessionLocal, engine
from .routers import categories, items, services
from .seed import seed_data

# Cria as tabelas no banco caso ainda não existam
Base.metadata.create_all(bind=engine)

# Popula dados iniciais apenas se o banco estiver totalmente vazio
with SessionLocal() as _db:
    if (
        _db.query(models.Category).count() == 0
        and _db.query(models.Item).count() == 0
    ):
        seed_data(_db)

app = FastAPI(title="Rework Tec Cel - Estoque")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(categories.router)
app.include_router(items.router)
app.include_router(services.router)


@app.get("/health", tags=["health"])
def health():
    return {"status": "ok"}
