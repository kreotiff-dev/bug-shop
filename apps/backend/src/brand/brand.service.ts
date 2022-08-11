import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}
  async create(dto: { name: string }) {
    const candidate = await this.prisma.brand.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (candidate) {
      throw new HttpException(
        `Бренд с таким названием уже существует`,
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.prisma.brand.create({
      data: {
        name: dto.name,
      },
    });
  }
  async getAll() {
    return await this.prisma.brand.findMany();
  }
  async getById(dto: { id: number }) {
    if (!dto.id) {
      throw new HttpException(`Введите id бренда`, HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.brand.findUnique({
      where: {
        id: dto.id,
      },
    });
  }
  async update(dto: { id: number; name: string }) {
    if (!dto.id) {
      throw new HttpException(`Введите id бренда`, HttpStatus.BAD_REQUEST);
    }
    const brandById = await this.prisma.brand.findUnique({
      where: {
        id: dto.id,
      },
    });
    const brandByName = await this.prisma.brand.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (!brandById) {
      throw new HttpException(`Бренд не найден`, HttpStatus.BAD_REQUEST);
    }
    if (!dto.name.length) {
      throw new HttpException(
        `Поле не может быть пустым`,
        HttpStatus.BAD_REQUEST
      );
    }
    if (brandByName && brandByName.id !== dto.id) {
      throw new HttpException(
        `Бренд с таким названием уже существует`,
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.prisma.brand.update({
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
      throw new HttpException(`Введите id бренда`, HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.brand.delete({
      where: {
        id: dto.id,
      },
    });
  }
}
