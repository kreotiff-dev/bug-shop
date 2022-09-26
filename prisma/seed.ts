import { PrismaClient, Role } from '@prisma/client';
import * as argon from 'argon2';
import { users } from './user';

const prisma = new PrismaClient();

async function createUser() {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const hash = await argon.hash(user.password);
    const userCreate = await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {},
      create: {
        email: user.email,
        password: hash,
      },
    });
    await prisma.basket.upsert({
      where: {
        userId: userCreate.id,
      },
      update: {},
      create: {
        userId: userCreate.id,
      },
    });
  }
}

async function main() {
  console.log('Загрузка данных в БД...');
  await createUser();
  const hash = await argon.hash('adminadmin');
  const admin = await prisma.user.upsert({
    where: {
      email: 'admin@admin.com',
    },
    update: {},
    create: {
      email: 'admin@admin.com',
      password: hash,
      role: Role.ADMIN,
    },
  });
  await prisma.basket.upsert({
    where: {
      userId: admin.id,
    },
    update: {},
    create: {
      userId: admin.id,
    },
  });
}

main()
  .catch(() => console.log('Загрузка завершена успешно.'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
