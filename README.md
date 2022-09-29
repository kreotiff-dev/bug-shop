# Store

- Открыть консоль и прописать команду
  - `git clone https://github.com/pr9n1k/store.git`
- Переходим в папку с проектом
  - `cd store`
- Запустить Docker
- В консоли прописать
  - `docker-compose up -d`
- Swagger документация
  - `http://localhost:3000/api`
- Ссылка на клиент
  - `http://localhost:4200`
- Ссылка на сервер
  - `http://localhost:3000`
- Ссылка на pgAdmin
  - `http://localhost:5555`

При первом запуске проекта в Docker:

- Логин администратора: `admin@admin.com`
- Пароль администратора: `adminadmin`

Доступ к pgAdmin:

- Логин: `pgadmin4@pgadmin.org`
- Пароль: `admin`

Для добавления сервера в pgAdmin:

- General/Имя: `store`
- Содениение/Адрес сервера: `store-db`
- Содениение/Имя пользователя: `postgres`
- Содениение/Пароль: `123`
