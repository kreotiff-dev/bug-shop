import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';

const logger = new Logger();

@Injectable()
export class BasketService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async addDevice(token: string, dto: { idDevice: number }) {
    const basket = await this.getBasketByToken(token);
    const candidate = await this.prisma.basketDevice.findFirst({
      where:{
        deviceId: dto.idDevice
      }
    })
    if(candidate){
      logger.error('Устройство уже добавлено в корзину')
      throw new HttpException('Устройство уже добавлено в корзину', HttpStatus.BAD_REQUEST);
    }
    const device = await this.prisma.device.findUnique({
      where: { id: dto.idDevice },
    });
    await this.prisma.basketDevice.create({
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
    return {message:'Устройство успешно добавлено в корзину'};
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
    await this.prisma.basketDevice.delete({
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
    return {message:'Устройство успешно удалено из корзины'};
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
    if(dto.count === 0){
      return await this.prisma.basketDevice.delete({
        where:{
          id:dto.idDevice
        }
      })
    }
    const basketDevice = await this.prisma.basketDevice.findFirst({
      where: {
        basketId: basket.id,
        deviceId: dto.idDevice, //Скрыть и будет добавлся первому в списке а не конкретному
      },
    });
    //У всех устройств в корзине меняется кол-во
    await this.prisma.basketDevice.update({
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

    return {message:'Кол-во успешно изменено'};
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
