# Astrology

Монорепозиторий для онлайн-сервиса астрологии и Таро.

## Стек

- **frontend**: Next.js
- **backend**: FastAPI

## План первого этапа

На старте закладываем фундамент:

- базовую структуру monorepo
- frontend-приложение с landing page и страницами-заглушками
- backend API с healthcheck и базовой модульной структурой
- документацию по запуску

## Структура

```text
Astrology/
  apps/
    web/        # Next.js frontend
    api/        # FastAPI backend
  docs/
    product/    # продуктовые заметки и ТЗ
```

## Следующие шаги

1. Сделать полноценный onboarding-landing
2. Добавить модели пользователя и birth profile
3. Реализовать первый сценарий натальной карты
4. Подготовить модуль tarot readings
5. Добавить БД и миграции

## Что уже есть

- базовый landing page
- страницы `natal-chart` и `tarot`
- API-маршруты `health`, `health/db`, `birth-profiles`, `natal-chart`
- первый end-to-end сценарий для создания профиля рождения
- MVP-расчёт натальной карты с сохранением результата
- same-origin proxy для frontend → API в проде, чтобы браузер не упирался в mixed content
- детальный natal chart breakdown: Луна, асцендент, стихия, отношения, карьера, предназначение
- конфиг `DATABASE_URL` с готовностью к persistent storage

## Локальный запуск

### Через Docker Compose

```bash
docker compose up --build
```

Сервисы:
- frontend: `http://localhost:3000`
- backend: `http://localhost:8000`
- postgres: `localhost:5432`

### Frontend

```bash
cd apps/web
npm install
npm run dev
```

### Backend

```bash
cd apps/api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
DATABASE_URL=postgresql+psycopg://astrology:astrology@localhost:5432/astrology uvicorn app.main:app --reload
```

## Постоянная БД: с чего начинаем

Сейчас проект готов к двум сценариям:

1. **локально / простой deploy** — SQLite в persistent volume:
   - путь по умолчанию: `/data/astrology.db`
2. **нормальный прод** — Postgres через `DATABASE_URL`

Ближайший следующий шаг для Coolify:
- создать отдельную Postgres database resource
- выдать API переменную `DATABASE_URL`
- задеплоить только `astrology-api`
- проверить `/api/health/db`

Это позволит перестать терять данные после redeploy.
