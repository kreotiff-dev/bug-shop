import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AuthDto } from '@store/interface';
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

const logger = new Logger();

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async create(dto: AuthDto) {
    const candidateForEmail = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (candidateForEmail) {
      logger.error(`Аккаунт с таким email ${dto.email} уже зарегистрирован`);
      throw new HttpException(
        `Аккаунт с таким email ${dto.email} уже зарегистрирован`,
        HttpStatus.BAD_REQUEST
      );
    }
    let role: Role = Role.USER;
    const admin = await this.prisma.user.findMany({
      where: {
        role: Role.ADMIN,
      },
    });
    if (!admin.length) {
      role = Role.ADMIN;
    }
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        role: role,
      },
    });
    await this.prisma.basket.create({
      data: {
        userId: user.id,
      },
    });
    return user;
  }
  async getMe(dto: { token: string }) {
    const token = dto.token.split(' ')[1];
    const decode = this.jwt.decode(token);
    if (!decode) {
      logger.error('Токен не валидный');
      throw new HttpException(`Токен не валидный`, HttpStatus.BAD_REQUEST);
    }
    const user = await this.prisma.user.findUnique({
      where: {
        email: decode['email'],
      },
    });
    delete user.password;
    return user;
  }

  async deleteMe(dto: { token: string }) {
    const token = dto.token.split(' ')[1];
    const decode = this.jwt.decode(token);
    if (!decode) {
      logger.error('Токен не валидный');
      throw new HttpException(`Токен не валидный`, HttpStatus.BAD_REQUEST);
    }
    const id = decode['sub'];
    await this.prisma.basket.delete({
      where: {
        userId: id,
      },
    });
    await this.prisma.token.deleteMany({
      where: {
        userId: id,
      },
    });
    const user = await this.prisma.user.delete({
      where: {
        email: decode['email'],
      },
    });
    return user;
  }
}
