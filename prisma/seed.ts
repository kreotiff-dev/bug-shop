import { devices } from './device';
import { PrismaClient, Role } from '@prisma/client';
import * as argon from 'argon2';
import { brands } from './brand';
import { types } from './type';
import { users } from './user';

const prisma = new PrismaClient();

// async function createUser() {
//   for (let i = 0; i < users.length; i++) {
//     const user = users[i];
//     const hash = await argon.hash(user.password);
//     const userCreate = await prisma.user.upsert({
//       where: {
//         email: user.email,
//       },
//       update: {},
//       create: {
//         email: user.email,
//         password: hash,
//       },
//     });
//     await prisma.basket.upsert({
//       where: {
//         userId: userCreate.id,
//       },
//       update: {},
//       create: {
//         userId: userCreate.id,
//       },
//     });
//   }
// }

async function createType() {
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    await prisma.type.upsert({
      where: {
        name: type.name,
      },
      update: {},
      create: {
        name: type.name,
      },
    });
  }
}

async function createBrand() {
  for (let i = 0; i < brands.length; i++) {
    const brand = brands[i];
    await prisma.brand.upsert({
      where: {
        name: brand.name,
      },
      update: {},
      create: {
        name: brand.name,
      },
    });
  }
}

async function createDevice() {
  for (let i = 0; i < devices.length; i++) {
    const device = devices[i];
    const img = `device-${i + 1}.jpg`;
    const price = parseInt(device.price);
    const brandId = parseInt(device.brandId);
    const typeId = parseInt(device.typeId);
    const newDevice = await prisma.device.upsert({
      where: {
        name: device.name,
      },
      update: {},
      create: {
        img,
        name: device.name,
        price,
        brandId,
        typeId,
      },
    });
    const infos = await prisma.deviceInfo.findMany({
      where: {
        deviceId: newDevice.id,
      },
    });
    if (!infos.length) {
      for (let j = 0; j < device.info.length; j++) {
        const info = device.info[j];
        await prisma.deviceInfo.create({
          data: {
            deviceId: newDevice.id,
            title: info.title,
            description: info.description,
          },
        });
      }
    }
  }
}

async function main() {
  console.log('Загрузка данных в БД...');
  await createType();
  await createBrand();
  await createDevice();
  const candidate = await prisma.user.findFirst({
    where: {
      role: Role.ADMIN,
    },
  });
  if (!candidate) {
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
}

main()
  .then(() => console.log('Загрузка завершена успешно.'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
