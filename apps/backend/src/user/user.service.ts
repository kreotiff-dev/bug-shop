import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AuthDto, updateUserDto } from '@store/interface';
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { AuthService } from './../auth/auth.service';

const logger = new Logger();

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    @Inject(forwardRef(() => AuthService))
    private auth: AuthService
  ) {}

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
    const access_token = dto.token.split(' ')[1];
    const decode = this.jwt.decode(access_token);
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

  async deleteMe(dto: { token: string; password: string }) {
    const access_token = dto.token.split(' ')[1];
    const decode = this.jwt.decode(access_token);
    if (!decode) {
      logger.error('Токен не валидный');
      throw new HttpException(`Токен не валидный`, HttpStatus.BAD_REQUEST);
    }
    const user = await this.prisma.user.findUnique({
      where: {
        email: decode['email'],
      },
    });
    if (!user) {
      logger.error('Пользователь не найден');
      throw new HttpException(`Пользователь не найден`, HttpStatus.BAD_REQUEST);
    }
    if (user.role === Role.ADMIN) {
      logger.error('Администратор не может удалить свой аккаунт');
      throw new HttpException(
        `Администратор не может удалить свой аккаунт`,
        HttpStatus.BAD_REQUEST
      );
    }
    const pwMatches = await argon.verify(user.password, dto.password);
    if (!pwMatches) {
      logger.error('Пароль не верный');
      throw new HttpException(`Пароль не верный`, HttpStatus.BAD_REQUEST);
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
    await this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    return {message: 'Пользователь удален'}
  }

  async update(token: string, dto: updateUserDto) {
    const access_token = token.split(' ')[1];
    const user = this.jwt.decode(access_token);
    if (!user) {
      logger.error('Токен не валидный');
      throw new HttpException(`Токен не валидный`, HttpStatus.BAD_REQUEST);
    }

    const updateUser = await this.prisma.user.update({
      where: {
        id: user['sub'],
      },
      data: {
        email: dto.email,
        name: dto.name,
        surname: dto.surname,
        bithday: dto.bithday,
        sex: dto.sex,
        phone: dto.phone,
      },
    });
    const tokens = await this.auth.signToken(
      updateUser.id,
      updateUser.email,
      updateUser.role
    );
    return { ...tokens };
  }

  async updatePassword(
    token: string,
    dto: { newPassword: string; oldPassword: string }
  ) {
    const access_token = token.split(' ')[1];
    const decode = this.jwt.decode(access_token);
    if (!decode) {
      logger.error('Токен не валидный');
      throw new HttpException(`Токен не валидный`, HttpStatus.BAD_REQUEST);
    }
    const user = await this.prisma.user.findUnique({
      where: {
        email: decode['email'],
      },
    });
    const pwMatches = await argon.verify(user.password, dto.oldPassword);
    if (!pwMatches) {
      logger.error('Старый пароль не верный');
      throw new HttpException(
        `Старый пароль не верный`,
        HttpStatus.BAD_REQUEST
      );
    }
    const hash = await argon.hash(dto.newPassword);
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hash,
      },
    });
    return {message:'Пароль изменен'}
  }

  async decode(token: string) {
    const access_token = token.split(' ')[1];
    const decode = this.jwt.decode(access_token);
    if (!decode) {
      logger.error('Токен не валидный');
      throw new HttpException(`Токен не валидный`, HttpStatus.BAD_REQUEST);
    }
    return decode;
  }
}
