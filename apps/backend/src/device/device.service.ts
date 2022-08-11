import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDeviceDto, deviceInfo, UpdateDeviceDto } from '@store/interface';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateDeviceDto) {
    const candidate = await this.prisma.device.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (candidate) {
      throw new HttpException(
        `Товар с таким название уже существует`,
        HttpStatus.BAD_REQUEST
      );
    }
    const device = await this.prisma.device.create({
      data: {
        ...dto,
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
