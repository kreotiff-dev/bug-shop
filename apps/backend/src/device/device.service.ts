import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateDeviceDto, deviceInfo, UpdateDeviceDto } from '@store/interface';
import { PrismaService } from 'nestjs-prisma';
import { FileService } from '../file/file.service';

const logger = new Logger();

@Injectable()
export class DeviceService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService
  ) {}
  async create(dto: CreateDeviceDto, file) {
    const candidate = await this.prisma.device.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (candidate) {
      logger.error('Товар с таким названием уже существует');
      throw new HttpException(
        `Товар с таким название уже существует`,
        HttpStatus.BAD_REQUEST
      );
    }
    const brand = await this.prisma.brand.findUnique({
      where: {
        id: dto.brandId,
      },
    });
    if (!brand) {
      logger.error('Бренд не найден');
      throw new HttpException('Бренд не найден', HttpStatus.BAD_REQUEST);
    }
    const type = await this.prisma.type.findUnique({
      where: {
        id: dto.brandId,
      },
    });
    if (!type) {
      logger.error('Категория не найден');
      throw new HttpException('Категория не найден', HttpStatus.BAD_REQUEST);
    }
    const picture = this.fileService.createFile(file);
    const device = await this.prisma.device.create({
      data: {
        ...dto,
        img: picture,
      },
    });
    return device;
  }
  async getAll() {
    return this.prisma.device.findMany();
  }
  async getById(dto: { id: number }) {
    const device = await this.prisma.device.findUnique({
      where: {
        id: dto.id,
      },
    });
    if (!device) {
      logger.error('Устройство не найдено');
      throw new HttpException('Устройство не найдено', HttpStatus.BAD_REQUEST);
    }
    return device;
  }
  async getFullInfo(dto: { id: number }) {
    const device = await this.prisma.device.findUnique({
      where: {
        id: dto.id,
      },
    });
    if (!device) {
      logger.error('Устройство не найдено');
      throw new HttpException('Устройство не найдено', HttpStatus.BAD_REQUEST);
    }
    const brand = await this.prisma.brand.findUnique({
      where: {
        id: device.brandId,
      },
    });
    const type = await this.prisma.type.findUnique({
      where: {
        id: device.typeId,
      },
    });
    const info = await this.prisma.deviceInfo.findMany({
      where: {
        deviceId: device.id,
      },
    });
    return { device, brand, type, info };
  }
  async update(dto: UpdateDeviceDto & { id: number }) {
    const candidate = await this.prisma.device.findUnique({
      where: {
        id: dto.id,
      },
    });
    if (!candidate) {
      logger.error('Устройство не найдено');
      throw new HttpException('Устройство не найдено', HttpStatus.BAD_REQUEST);
    }
    const device = await this.prisma.device.update({
      where: { id: dto.id },
      data: {
        ...dto,
      },
    });
    return device;
  }
  async addInfo(dto: deviceInfo & { deviceId: number }) {
    const candidate = await this.prisma.device.findUnique({
      where: {
        id: dto.deviceId,
      },
    });
    if (!candidate) {
      logger.error('Устройство не найдено');
      throw new HttpException('Устройство не найдено', HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.deviceInfo.create({
      data: {
        title: dto.title,
        description: dto.description,
        deviceId: dto.deviceId,
      },
    });
  }
  async getInfo(dto: { id: number }) {
    const candidate = await this.prisma.device.findUnique({
      where: {
        id: dto.id,
      },
    });
    if (!candidate) {
      logger.error('Устройство не найдено');
      throw new HttpException('Устройство не найдено', HttpStatus.BAD_REQUEST);
    }
    return this.prisma.deviceInfo.findMany({
      where: {
        deviceId: dto.id,
      },
    });
  }
  async delete(dto: { id: number }) {
    const candidate = await this.prisma.device.findUnique({
      where: {
        id: dto.id,
      },
    });
    if (!candidate) {
      logger.error('Устройство не найдено');
      throw new HttpException('Устройство не найдено', HttpStatus.BAD_REQUEST);
    }
    await this.prisma.deviceInfo.deleteMany({
      where: {
        deviceId: dto.id,
      },
    });
    return await this.prisma.device.delete({
      where: {
        id: dto.id,
      },
    });
  }
}
