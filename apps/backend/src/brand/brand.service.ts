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
      logger.error('Бренд с таким названием уже существует');
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
  async getAll(query: { page?: string; limit?: string }) {
    const page = parseInt(query.page) || 1;
    const take = parseInt(query.limit) || 8;
    const skip = page * take - take;
    const total = await this.prisma.brand.count();
    const brands = await this.prisma.brand.findMany({
      orderBy: {
        id: 'asc',
      },
      skip,
      take,
    });
    return { brands, count: total };
  }
  async getById(dto: { id: number }) {
    const brand = await this.prisma.brand.findUnique({
      where: {
        id: dto.id,
      },
    });
    if (!brand) {
      logger.warn('Бренд по данному id не существует');
      throw new HttpException(
        'Бренд по данному id не существует',
        HttpStatus.BAD_REQUEST
      );
    }
    return brand;
  }
  async update(dto: { id: number; name: string }) {
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
      logger.error('Бренд по данному id не существует');
      throw new HttpException(
        `Бренд по данному id не существует`,
        HttpStatus.BAD_REQUEST
      );
    }
    if (brandByName && brandByName.id !== dto.id) {
      logger.error('Бренд с таким названием уже существует');
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
    const brand = await this.prisma.brand.findUnique({
      where: {
        id: dto.id,
      },
    });
    if (!brand) {
      logger.warn('Бренд по данному id не существует');
      throw new HttpException(
        'Бренд по данному id не существует',
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.prisma.brand.delete({
      where: {
        id: dto.id,
      },
    });
  }
}
