import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateDeviceDto, deviceInfo, UpdateDeviceDto } from '@store/interface';
import { PrismaService } from 'nestjs-prisma';
import { FileService } from '../file/file.service';

const logger = new Logger();

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService, private fileService: FileService) {}
  async create(dto: CreateDeviceDto, file) {
    const candidate = await this.prisma.device.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (candidate) {
      logger.error('Товар с таким названием уже существует')
      throw new HttpException(
        `Товар с таким название уже существует`,
        HttpStatus.BAD_REQUEST
      );
    }
    const picture = this.fileService.createFile(file);
    const device = await this.prisma.device.create({
      data: {
        ...dto,
        img: picture
      },
    });
    return device;
  }
  async getAll() {
    return this.prisma.device.findMany();
  }
  async getById(dto: { id: number }) {
    return this.prisma.device.findUnique({
      where: {
        id: dto.id,
      },
    });
  }
  async update(dto: UpdateDeviceDto & { id: number }) {
    const device = await this.prisma.device.update({
      where: { id: dto.id },
      data: {
        ...dto,
      },
    });
    return device;
  }
  async addInfo(dto: deviceInfo & { deviceId: number }) {
    return await this.prisma.deviceInfo.create({
      data: {
        title: dto.title,
        description: dto.description,
        deviceId: dto.deviceId,
      },
    });
  }
  async getInfo(dto: { id: number }) {
    return this.prisma.deviceInfo.findMany({
      where: {
        deviceId: dto.id,
      },
    });
  }
  async delete(dto: { id: number }) {
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
