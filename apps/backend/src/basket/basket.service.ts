import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Basket } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

const logger = new Logger();

@Injectable()
export class BasketService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async addDevice(token: string, dto: { idDevice: number }) {
    const basket = await this.getBasketByToken(token);
    const device = await this.prisma.device.findUnique({
      where: { id: dto.idDevice },
    });
    const basketDevice = await this.prisma.basketDevice.create({
      data: {
        basketId: basket.id,
        deviceId: dto.idDevice,
      },
    });
    await this.prisma.basket.update({
      where: { id: basket.id },
      data: {
        totalPrice: basket.totalPrice + device.price,
      },
    });
    return basketDevice;
  }

  async deleteDevice(token: string, dto: { idDevice: number }) {
    const basket = await this.getBasketByToken(token);
    const device = await this.prisma.device.findUnique({
      where: { id: dto.idDevice },
    });
    const basketDevice = await this.prisma.basketDevice.findFirst({
      where: {
        basketId: basket.id,
        deviceId: dto.idDevice,
      },
    });
    const deviceDelete = await this.prisma.basketDevice.delete({
      where: {
        id: basketDevice.id,
      },
    });
    await this.prisma.basket.update({
      where: { id: basket.id },
      data: {
        totalPrice: basket.totalPrice - device.price * basketDevice.count,
      },
    });
    return deviceDelete;
  }

  async getBasketDevice(token: string) {
    const basket = await this.getBasketByToken(token);
    return await this.prisma.basketDevice.findMany({
      where: {
        basketId: basket.id,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async updateCountDevice(
    token: string,
    dto: { idDevice: number; count: number }
  ) {
    const basket = await this.getBasketByToken(token);
    const basketDevice = await this.prisma.basketDevice.findFirst({
      where: {
        basketId: basket.id,
        deviceId: dto.idDevice, //Скрыть и будет добавлся первому в списке а не конкретному
      },
    });
    //У всех устройств в корзине меняется кол-во
    const deviceUpdate = await this.prisma.basketDevice.update({
      where: {
        id: basketDevice.id,
      },
      data: {
        count: dto.count,
      },
    });

    //Изменение общей стоимости корзины
    const device = await this.prisma.device.findUnique({
      where: { id: dto.idDevice },
    });
    const factor = dto.count - basketDevice.count;
    await this.prisma.basket.update({
      where: { id: basket.id },
      data: {
        totalPrice: basket.totalPrice + device.price * factor,
      },
    });

    return deviceUpdate;
  }

  async isBasket(token: string, dto: { idDevice: number }) {
    const basket = await this.getBasketByToken(token);
    const candidate = await this.prisma.basketDevice.findFirst({
      where: {
        basketId: basket.id,
        deviceId: dto.idDevice,
      },
    });
    return candidate ? true : false;
  }

  async getTotalPrice(token: string) {
    const basket = await this.getBasketByToken(token);
    return basket.totalPrice;
  }

  async getBasketByToken(token: string) {
    const access_token = token.split(' ')[1];
    const user = this.jwt.decode(access_token);

    if (!user) {
      logger.error('Токен не валидный');
      throw new HttpException(`Токен не валидный`, HttpStatus.BAD_REQUEST);
    }
    return this.prisma.basket.findUnique({
      where: {
        userId: user['sub'],
      },
    });
  }
}
