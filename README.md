# Store

При первом запуске проекта в Docker:
Логин администратора: admin@admin.com
Пароль администратора: adminadmin

Для запуска Docker

- Открыть консоль и прописать команду
  - `git clone https://github.com/pr9n1k/store.git`
- Переходим в папку с проектом
  - `cd store`
- Запустить Docker
- В консоли прописать
  - `docker-compose up -d`
- Swagger документация
  - `http://localhost:3000/api`

Для запуска локально

- Открыть консоль и прописать команду
  - `git clone https://github.com/pr9n1k/store.git`
- Переходим в папку с проектом
  - `cd store`
- Запустить Docker
- Устанавливаем необходимые пакеты
  - `npm install`
- Создаем контейнер для БД
  - `docker compose up store-db -d`
- Создаем миграции таблиц в БД
  - `npx prisma migrate dev`
- Пушим в таблицы в БД
  - `npx prisma db push`
- Пушим в таблицы в БД
  - `npx prisma db push`
- Генерируем данные на клиент
  - `npx prisma generate`
- Генерируем данные на клиент
  - `npm run run:all` / `yarn run:all`
