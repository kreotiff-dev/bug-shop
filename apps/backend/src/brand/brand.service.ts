import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { createBrandDto } from '@store/interface';
import { PrismaService } from 'nestjs-prisma';

const logger = new Logger();

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}
  async create(dto: createBrandDto) {
    const candidate = await this.prisma.brand.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (candidate) {
      logger.error('Бренд с таким названием уже существует')
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
      logger.error('Введите id бренда');
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
      logger.error('Введите id бренда')
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
      logger.error('Введите id бренда')
      throw new HttpException(`Бренд не найден`, HttpStatus.BAD_REQUEST);
    }
    // if (brandByName && brandByName.id !== dto.id) {
    //   throw new HttpException(
    //     `Бренд с таким названием уже существует`,
    //     HttpStatus.BAD_REQUEST
    //   );
    // }
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
      logger.error('Введите id бренда')
      throw new HttpException(`Введите id бренда`, HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.brand.delete({
      where: {
        id: dto.id,
      },
    });
  }
}
