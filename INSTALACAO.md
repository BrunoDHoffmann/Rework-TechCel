# Guia de Instalação — Rework Tec Cel (máquina do cliente)

Sistema local de controle de estoque e manutenções. Roda inteiramente na
máquina do cliente, sem depender de internet no dia a dia (a internet só é
necessária uma vez, na instalação, para baixar os componentes).

---

## 1. Requisitos da máquina

- Windows 10 ou 11, 64 bits
- Cerca de 4 GB de memória RAM livre e 3 GB de espaço em disco
- Acesso de administrador
- Internet **apenas na primeira instalação**

Não é preciso instalar Python, Node ou banco de dados — tudo roda dentro do
Docker.

---

## 2. Instalar o Docker Desktop

1. Baixe em: https://www.docker.com/products/docker-desktop
2. Execute o instalador e siga o assistente (ele instala o WSL2
   automaticamente; pode pedir para reiniciar o computador).
3. Abra o **Docker Desktop** e aguarde aparecer **"Engine running"** (ícone da
   baleia no canto inferior esquerdo fica verde).
4. **Recomendado:** em `Settings > General`, marque
   **"Start Docker Desktop when you log in"**. Assim o sistema volta a
   funcionar sozinho toda vez que o computador liga.

> Observação de licença: o Docker Desktop é gratuito para uso pessoal e para
> pequenas empresas. Para empresas grandes há uma licença paga — o caso de uma
> assistência técnica pequena normalmente se enquadra no uso gratuito.

---

## 3. Copiar a pasta do sistema

Copie a pasta **`rework tec cel`** inteira para a máquina do cliente
(por pen drive, rede ou nuvem). Um bom local é, por exemplo:

```
C:\rework tec cel
```

---

## 4. Primeira instalação

1. Certifique-se de que o **Docker Desktop está aberto e rodando**.
2. Dentro da pasta, dê **dois cliques em `instalar.bat`**.
3. Aguarde. Na primeira vez pode levar de 5 a 15 minutos (ele baixa e monta
   tudo). Nas próximas vezes é quase instantâneo.
4. Ao final, o navegador abre automaticamente em **http://localhost:5173**.

Pronto — o sistema já vem com categorias e itens de exemplo cadastrados.

---

## 5. Uso no dia a dia

- **Ligar o sistema:** dois cliques em `iniciar.bat` (abre o navegador já no
  sistema).
- **Desligar o sistema:** dois cliques em `parar.bat`.
- Se o Docker Desktop estiver com o início automático ativado (passo 2.4), o
  sistema sobe sozinho quando o computador é ligado — nesse caso basta abrir o
  navegador em `http://localhost:5173`.

### Criar um atalho na Área de Trabalho

1. Clique com o botão direito em `iniciar.bat`.
2. **Enviar para > Área de trabalho (criar atalho)**.
3. Renomeie o atalho para **"Rework Tec Cel"**.

(Opcional) Para trocar o ícone: botão direito no atalho > Propriedades >
Alterar ícone.

---

## 6. Backup dos dados

Os dados ficam guardados em um volume do Docker (`rework_pgdata`) e **não são
apagados** ao parar o sistema. Ainda assim, faça backups periódicos:

- Dê dois cliques em **`backup.bat`**. Ele gera um arquivo
  `backup_rework_DATA.sql` na própria pasta.
- Guarde esse arquivo em local seguro (nuvem/pen drive).

**Para restaurar** um backup (feito por um técnico), com o sistema rodando:

```
docker exec -i rework_db psql -U postgres -d rework < backup_rework_DATA.sql
```

---

## 7. Atualizar o sistema (nova versão)

1. Faça um backup (passo 6).
2. Substitua os arquivos do sistema pela nova versão (mantendo a mesma pasta).
3. Rode `instalar.bat` novamente. Os dados são preservados.

---

## 8. Cuidados importantes

- **Nunca** rode `docker compose down -v`. O `-v` apaga o banco de dados
  (todos os itens e manutenções). O `parar.bat` usa apenas `down`, que é
  seguro.
- Não é preciso deixar o navegador aberto para o sistema funcionar — ele roda
  em segundo plano enquanto o Docker estiver ativo.

---

## 9. Endereços e portas

- Sistema (tela): http://localhost:5173
- API / documentação técnica: http://localhost:8010/docs
- Banco de dados: porta 5433

Se alguma dessas portas já estiver em uso na máquina, é preciso ajustá-las no
arquivo `docker-compose.yml`.

---

## 10. Problemas comuns

| Sintoma | O que fazer |
|--------|-------------|
| "Docker daemon is not running" | Abra o Docker Desktop e aguarde "Engine running". |
| A página não abre | Aguarde 1 minuto após iniciar e atualize (F5). |
| Continua sem abrir | Abra o Docker Desktop e confira se os 3 contêineres (`rework_db`, `rework_backend`, `rework_frontend`) estão em execução. |
| Erro de porta ocupada | Ajuste as portas no `docker-compose.yml`. |
