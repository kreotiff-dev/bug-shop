# Store

- Открыть консоль и прописать команду
  - `git clone https://github.com/kreotiff-dev/bug-shop.git`
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

# Production
Database
--------

```bash
apt update
apt install -y postgresql postgresql-contrib
sudo -u postgres createuser --interactive
> Enter name of role to add: bug-shop
> Shall the new role be a superuser? (y/n) n
> Shall the new role be allowed to create databases? (y/n) y
> Shall the new role be allowed to create more new roles? (y/n) n
sudo -u postgres psql
\password bug-shop # Вводим пароль
```

Затем в папке приложения правим файл **.env**
```
POSTGRES_PASSWORD=выбранный пароль
```

Webserver
---------

```bash
apt install -y nginx
mkdir /etc/nginx/vhosts-resources/bug-shop.ru/ -p
ln -s /var/www/www-root/data/www/bug-shop.ru/store/apps/frontend/nginx-hosting.conf /etc/nginx/vhosts-resources/bug-shop.ru/api.conf
```

Node
----

```bash
apt install curl
curl -fsSL https://deb.nodesource.com/setup_17.x | sudo -E bash -
apt install -y nodejs
npm i
npx prisma generate
npm run build
npm run build:frontend
```


On hosting
----------

Get from repository and update

```bash
service bug-shop restart
```

Change version
--------------

- https://bug-shop.ru/v/1 - set version to 1 (branch)
- https://bug-shop.ru/v - check version (branch)

default branch - **main**