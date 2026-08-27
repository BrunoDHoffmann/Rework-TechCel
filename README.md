# Rework Tec Cel — Controle de Estoque

Sistema containerizado para gerenciamento de estoque de peças de manutenção
(celulares, tablets, controles de videogame, etc.), com controle de manutenções
que dá baixa automática no estoque.

## Stack

- **Backend:** FastAPI + Poetry + SQLAlchemy (porta 8010)
- **Frontend:** React (Vite) + Tailwind CSS (porta 5173)
- **Banco:** PostgreSQL 16 (porta 5433)
- **Orquestração:** Docker Compose

## Funcionalidades

- Cadastro de itens com quantidade, custo e venda (custo/venda opcionais)
- Botões `+` / `−` e input numérico para ajustar a quantidade
- Categorias: criar, excluir e vincular itens
- Busca por nome e filtro por categoria
- Tela de manutenção: seleciona as peças usadas no serviço e baixa
  automaticamente a quantidade do estoque
- Histórico de manutenções realizadas

## Como rodar (local)

Pré-requisito: **Docker Desktop** instalado e em execução.

Na pasta do projeto:

```bash
docker compose up --build
```

Depois de subir:

- Frontend: http://localhost:5173
- API (docs Swagger): http://localhost:8010/docs

> As portas do host foram escolhidas (8010 backend, 5433 banco) para não
> conflitar com outros serviços que já rodam na máquina nas portas 8000/5432.
> Dentro dos containers a comunicação continua normal (o backend fala com o
> banco em `db:5432`).

Para parar:

```bash
docker compose down
```

Para apagar também os dados do banco:

```bash
docker compose down -v
```

## Estrutura

```
rework tec cel/
├── docker-compose.yml
├── backend/            # API FastAPI
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── database.py
│   │   └── routers/    # categories, items, services
│   ├── pyproject.toml
│   └── Dockerfile
└── frontend/           # React + Vite + Tailwind
    ├── src/
    │   ├── pages/      # Estoque.jsx, Manutencao.jsx
    │   ├── api.js
    │   └── App.jsx
    └── Dockerfile
```

## Observações

- Ao excluir uma categoria, os itens vinculados **não são apagados** — apenas
  ficam sem categoria.
- Ao registrar uma manutenção, o estoque é validado: se não houver quantidade
  suficiente de alguma peça, o registro é recusado.
- Excluir uma manutenção do histórico **não repõe** o estoque (é só um registro).
