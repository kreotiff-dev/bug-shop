import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { createTypeDto } from '@store/interface';
import { PrismaService } from 'nestjs-prisma';

const logger = new Logger()


@Injectable()
export class TypeService {
  constructor(private prisma: PrismaService) {}
  async create(dto: createTypeDto) {
    const candidate = await this.prisma.type.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (candidate) {
      logger.error('Такая категория уже существует')
      throw new HttpException(
        `Такая категория уже существует`,
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.prisma.type.create({
      data: {
        name: dto.name,
      },
    });
  }
  async getAll() {
    return this.prisma.type.findMany();
  }
  async getById(dto: { id: number }) {
    if (!dto.id) {
      logger.error(`Введите id`)
      throw new HttpException(`Введите id`, HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.type.findUnique({
      where: {
        id: dto.id,
      },
    });
  }
  async update(dto: { id: number; name: string }) {
    if (!dto.id) {
      logger.error('Введите id');
      throw new HttpException(`Введите id`, HttpStatus.BAD_REQUEST);
    }
    const typeById = await this.prisma.type.findUnique({
      where: {
        id: dto.id,
      },
    });
    const typeByName = await this.prisma.type.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (!typeById) {
      throw new HttpException(`Категория не найдена`, HttpStatus.BAD_REQUEST);
    }
    if (typeByName && typeByName.id !== dto.id) {
      throw new HttpException(
        `Такая категория уже существует`,
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.prisma.type.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
      },
    });
  }
  async delete(dto: { id: number }) {
    if (!dto.id) {
      logger.error('Введите id');
      throw new HttpException(`Введите id`, HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.type.delete({
      where: {
        id: dto.id,
      },
    });
  }
}
