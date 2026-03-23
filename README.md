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
- управление историей: удаление профилей и натальных карт
- email/password авторизация с дефолтным администратором
- admin page с toggle для Google auth
- конфиг `DATABASE_URL` с готовностью к persistent storage

## Локальный запуск

### Через Docker Compose

```bash
docker compose up --build
```

Сервисы:
- frontend: `http://localhost:3000`
- backend: `http://localhost:8000`
- SQLite хранится в docker volume `api_data`

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
DATABASE_URL=sqlite:////data/astrology.db uvicorn app.main:app --reload
```

## Текущая стратегия хранения данных

Сейчас проект возвращён к SQLite:

- основной путь: `/data/astrology.db`
- для Docker Compose используется persistent volume `api_data`
- для Coolify API нужно держать `DATABASE_URL=sqlite:////data/astrology.db`

Это более лёгкий режим для сервера и снижает нагрузку по сравнению с отдельным Postgres-сервисом.
