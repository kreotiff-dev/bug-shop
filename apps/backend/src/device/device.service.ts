import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import {
  CreateDeviceDto,
  deviceInfo,
  queryDeviceDto,
  UpdateDeviceDto,
  UpdateInfoDeviceDto,
} from '@store/interface';
import { PrismaService } from 'nestjs-prisma';
import { FileService } from '../file/file.service';
import { Device } from '@prisma/client';

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
        id: parseInt(dto.brandId),
      },
    });
    if (!brand) {
      logger.error('Бренд не найден');
      throw new HttpException('Бренд не найден', HttpStatus.BAD_REQUEST);
    }
    const type = await this.prisma.type.findUnique({
      where: {
        id: parseInt(dto.typeId),
      },
    });
    if (!type) {
      logger.error('Категория не найдена');
      throw new HttpException('Категория не найдена', HttpStatus.BAD_REQUEST);
    }
    const picture = this.fileService.createFile(file);
    const device = await this.prisma.device.create({
      data: {
        name: dto.name,
        price: parseInt(dto.price),
        brandId: parseInt(dto.brandId),
        typeId: parseInt(dto.typeId),
        img: picture,
      },
    });
    if (dto.info) {
      const info: deviceInfo[] = JSON.parse(dto.info);
      info.forEach(
        async (item) =>
          await this.prisma.deviceInfo.create({
            data: {
              deviceId: device.id,
              title: item.title,
              description: item.description,
            },
          })
      );
    }
    return device;
  }
  async getAll(query: queryDeviceDto) {
    const page = !isNaN(parseInt(query.page)) ? parseInt(query.page) : 1;
    const take = !isNaN(parseInt(query.limit)) ? parseInt(query.limit) : 8;

    const skip = page * take - take;
    let devices: Device[] = [];
    let total: number;
    if (isNaN(parseInt(query.brandId)) && isNaN(parseInt(query.typeId))) {
      devices = await this.prisma.device.findMany({ skip, take });
      total = await this.prisma.device.count();
    }
    if (!isNaN(parseInt(query.brandId)) && isNaN(parseInt(query.typeId))) {
      devices = await this.prisma.device.findMany({
        skip,
        take,
        where: { brandId: parseInt(query.brandId) },
      });
      total = await this.prisma.device.count({
        where: { brandId: parseInt(query.brandId) },
      });
    }
    if (isNaN(parseInt(query.brandId)) && !isNaN(parseInt(query.typeId))) {
      devices = await this.prisma.device.findMany({
        skip,
        take,
        where: { typeId: parseInt(query.typeId) },
      });
      total = await this.prisma.device.count({
        where: { typeId: parseInt(query.typeId) },
      });
    }
    if (!isNaN(parseInt(query.brandId)) && !isNaN(parseInt(query.typeId))) {
      devices = await this.prisma.device.findMany({
        skip,
        take,
        where: {
          brandId: parseInt(query.brandId),
          typeId: parseInt(query.typeId),
        },
      });
      total = await this.prisma.device.count({
        where: {
          brandId: parseInt(query.brandId),
          typeId: parseInt(query.typeId),
        },
      });
    }
    return { devices, count: total };
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
  async update(dto: UpdateDeviceDto & { id: number }, file) {
    const candidate = await this.prisma.device.findUnique({
      where: {
        id: dto.id,
      },
    });
    if (!candidate) {
      logger.error('Устройство не найдено');
      throw new HttpException('Устройство не найдено', HttpStatus.BAD_REQUEST);
    }
    const brand = await this.prisma.brand.findUnique({
      where: {
        id: parseInt(dto.brandId),
      },
    });
    if (!brand) {
      logger.error('Бренд не найден');
      throw new HttpException('Бренд не найден', HttpStatus.BAD_REQUEST);
    }
    const type = await this.prisma.type.findUnique({
      where: {
        id: parseInt(dto.typeId),
      },
    });
    if (!type) {
      logger.error('Категория не найдена');
      throw new HttpException('Категория не найдена', HttpStatus.BAD_REQUEST);
    }

    if (file) {
      const picture = this.fileService.createFile(file);
      await this.prisma.device.update({
        where: { id: dto.id },
        data: {
          img: picture,
        },
      });
    }
    const device = await this.prisma.device.update({
      where: { id: dto.id },
      data: {
        brandId: brand.id,
        name: dto.name,
        price: parseInt(dto.price),
        typeId: type.id,
      },
    });
    const deviceInfo = await this.prisma.deviceInfo.findMany({
      where: {
        deviceId: device.id,
      },
    });
    deviceInfo.forEach(async (deviceI) => {
      const info: UpdateInfoDeviceDto[] = JSON.parse(dto.info);
      if (!info.some((item) => item.id === deviceI.id)) {
        // logger.debug(`Удалить ${deviceI.title}`);
        await this.prisma.deviceInfo.delete({
          where: {
            id: deviceI.id,
          },
        });
      }
    });
    if (dto.info) {
      const info: UpdateInfoDeviceDto[] = JSON.parse(dto.info);
      info.forEach(async (item) => {
        if (item.id) {
          await this.prisma.deviceInfo.update({
            where: {
              id: item.id,
            },
            data: {
              title: item.title,
              description: item.description,
            },
          });
        } else {
          await this.prisma.deviceInfo.create({
            data: {
              deviceId: device.id,
              title: item.title,
              description: item.description,
            },
          });
        }
      });
    }
    return {message:'Устройство успешно обновлено'};
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
    if(candidate.img){
      this.fileService.removeFile(candidate.img);
    }
    await this.prisma.device.delete({
      where: {
        id: dto.id,
      },
    });
    return {message:'Устройство успешно удалено'}
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
}
