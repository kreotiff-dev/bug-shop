import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'nestjs-prisma';
import { AuthDto } from '@store/interface';
import * as argon from 'argon2';
import { Role } from '@prisma/client';

const logger = new Logger();

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}


  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      logger.error('Логин не верный')
      throw new HttpException(`Логин не верный`, HttpStatus.BAD_REQUEST);
    }
    const pwMatches = await argon.verify(user.password, dto.password);
    if (!pwMatches) {
      logger.error('Пароль не верный')
      throw new HttpException(`Пароль не верный`, HttpStatus.BAD_REQUEST);
    }
    const tokens = await this.signToken(user.id, user.email);
    return { ...tokens };
  }
  async registration(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.create({
        email: dto.email,
        password: hash,
      });
      const tokens = await this.signToken(user.id, user.email);
      return { ...tokens };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
  async logout(token: string) {
    try {
      return this.prisma.token.deleteMany({
        where: {
          refresh: token,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('JWT_ACCESS_SECRET_EXPIRES_IN'),
      secret: this.config.get('JWT_ACCESS_SECRET'),
    });
    const refresh_token = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('JWT_REFRESH_SECRET_EXPIRES_IN'),
      secret: this.config.get('JWT_REFRESH_SECRET'),
    });
    this.saveRefreshToken(userId, refresh_token);
    return {
      access_token,
      refresh_token,
    };
  }
  // В будущем переписать для массива токенов
  async saveRefreshToken(userId: number, token: string) {
    const thisToken = await this.prisma.token.findFirst({
      where: {
        userId,
      },
    });
    if (!thisToken) {
      return await this.prisma.token.create({
        data: {
          refresh: token,
          userId,
        },
      });
    }
    const data = await this.prisma.token.update({
      where: {
        id: thisToken.id,
      },
      data: {
        refresh: token,
      },
    });
    return data;
  }
  async checkToken(refreshToken: string) {
    const refreshTokenVerify = await this.jwt.verifyAsync(refreshToken, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
    });
    const email = refreshTokenVerify['email'];
    if (!email) {
      throw new ForbiddenException();
    }
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');
    return user;
  }

  async refresh(refreshToken: string) {
    try {
      if (!refreshToken) {
        logger.error('Ошибка авторизации')
        throw new UnauthorizedException({
          message: 'Ошибка авторизации',
        });
      }

      const userData = await this.checkToken(refreshToken);
      const tokenFromDb = await this.prisma.token.findFirst({
        where: {
          refresh: refreshToken,
        },
      });
      if (!userData || !tokenFromDb) {
        logger.error('Ошибка авторизации')
        throw new UnauthorizedException({
          message: 'Ошибка авторизации',
        });
      }

      return await this.signToken(userData.id, userData.email);
    } catch (error) {
      logger.error('Токен устарел')
      throw new UnauthorizedException({ message: 'Токен устарел' });
    }
  }
  async getToken() {
    return await this.prisma.token.findMany();
  }
  async create(dto: AuthDto) {
    const candidateForEmail = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (candidateForEmail) {
      logger.error(`Аккаунт с таким email ${dto.email} уже зарегистрирован`)
      throw new HttpException(
        `Аккаунт с таким email ${dto.email} уже зарегистрирован`,
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.prisma.user.create({
      data: {
        ...dto,
        role: Role.ADMIN,
      },
    });
  }
  async delete (dto: {id: number}){
    await this.prisma.basket.delete({
      where:{
        userId: dto.id
      }
    })
    const user = await this.prisma.user.findUnique({
      where:{
        id: dto.id
      }
    })
    return user;
  }
}
