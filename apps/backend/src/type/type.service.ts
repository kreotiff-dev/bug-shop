import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TypeService {
  constructor(private prisma: PrismaService) {}
  async create(dto: { name: string }) {
    const candidate = await this.prisma.type.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (candidate) {
      throw new HttpException(
        `Такой тип уже существует`,
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
      throw new HttpException(`Тип не найден`, HttpStatus.BAD_REQUEST);
    }
    if (!dto.name.length) {
      throw new HttpException(
        `Поле не может быть пустым`,
        HttpStatus.BAD_REQUEST
      );
    }
    if (typeByName && typeByName.id !== dto.id) {
      throw new HttpException(
        `Такой тип уже существует`,
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
      throw new HttpException(`Введите id`, HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.type.delete({
      where: {
        id: dto.id,
      },
    });
  }
}
