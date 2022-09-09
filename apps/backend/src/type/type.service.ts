import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { createTypeDto } from '@store/interface';
import { PrismaService } from 'nestjs-prisma';

const logger = new Logger();

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
      logger.error('Такая категория уже существует');
      throw new HttpException(
        `Такая категория уже существует`,
        HttpStatus.BAD_REQUEST
      );
    }
    await this.prisma.type.create({
      data: {
        name: dto.name,
      },
    });
    return {message:'Категория успешно создана'}
  }
  async getAll(query: { page?: string; limit?: string }) {
    const page = parseInt(query.page) || 1;
    const take = parseInt(query.limit) || 8;
    const skip = page * take - take;
    const total = await this.prisma.type.count();
    const types = await this.prisma.type.findMany({
      orderBy: {
        id: 'asc',
      },
      skip,
      take,
    });
    return { types, count: total };
  }
  async getById(dto: { id: number }) {
    return await this.prisma.type.findUnique({
      where: {
        id: dto.id,
      },
    });
  }
  async update(dto: { id: number; name: string }) {
    const candidate = await this.prisma.type.findUnique({
      where: {
        id: dto.id,
      },
    });
    if (!candidate) {
      logger.error('Категория не найдена');
      throw new HttpException(`Категория не найдена`, HttpStatus.BAD_REQUEST);
    }
    const typeByName = await this.prisma.type.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (typeByName && typeByName.id !== dto.id) {
      throw new HttpException(
        `Такая категория уже существует`,
        HttpStatus.BAD_REQUEST
      );
    }
    await this.prisma.type.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
      },
    });
    return {message:'Категория успешно обновлена'}
  }
  async delete(dto: { id: number }) {
    const candidate = await this.prisma.type.findUnique({
      where: {
        id: dto.id,
      },
    });
    if (!candidate) {
      logger.error('Категория не найдена');
      throw new HttpException(`Категория не найдена`, HttpStatus.BAD_REQUEST);
    }
    await this.prisma.type.delete({
      where: {
        id: dto.id,
      },
    });
    return {message: 'Категория успешно удалена'}
  }
}
