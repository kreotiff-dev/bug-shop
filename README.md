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
Enter name of role to add: bug-shop
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
ln -s /var/www/www-root/data/www/bug-shop.ru/store/apps/frontend/bug-shop.conf /etc/nginx/vhosts-resources/bug-shop.ru/
```

Node
----

```bash
apt install curl
curl -fsSL https://deb.nodesource.com/setup_17.x | sudo -E bash -
apt install -y nodejs
```
