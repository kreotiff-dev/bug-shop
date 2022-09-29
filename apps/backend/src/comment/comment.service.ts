import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { commentDto, updateCommentDto } from '@store/interface';
import { PrismaService } from 'nestjs-prisma';

const logger = new Logger();

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async create(dto: commentDto, token: string) {
    const access_token = token.split(' ')[1];
    const user = this.jwt.decode(access_token);
    const candidate = await this.prisma.comment.findFirst({
      where: {
        userId: user['sub'],
        deviceId: dto.idDevice,
      },
    });
    if (candidate) {
      logger.error('Вы уже оставляли отзыв данного устройства');
      throw new HttpException(
        `Вы уже оставляли отзыв данного устройства`,
        HttpStatus.BAD_REQUEST
      );
    }
    const device = await this.prisma.device.findUnique({
      where: {
        id: dto.idDevice,
      },
    });
    if (!device) {
      logger.error('Устройство не найдено');
      throw new HttpException(`Устройство не найдено`, HttpStatus.BAD_REQUEST);
    }
    await this.prisma.comment.create({
      data: {
        userId: user['sub'],
        deviceId: dto.idDevice,
        comment: dto.comment,
      },
    });
    return { message: 'Отзыв успешно создан' };
  }

  async getCommentsDevice(id: number) {
    return this.prisma.comment.findMany({
      where: {
        deviceId: id,
      },
    });
  }

  // async getCommentById(id: number, token: string) {
  //   const access_token = token.split(' ')[1];
  //   const user = this.jwt.decode(access_token);
  //   // if (user['role'] === Role.ADMIN) {
  //   //   return this.prisma.comment.findUnique({
  //   //     where: {
  //   //       id: id,
  //   //     },
  //   //   });
  //   // }
  //   return this.prisma.comment.findFirst({
  //     where: {
  //       id: id,
  //       userId: user['sub'],
  //     },
  //   });
  // }
  async update(dto: updateCommentDto, token: string, id: number) {
    const access_token = token.split(' ')[1];
    const user = this.jwt.decode(access_token);
    const candidate = await this.prisma.comment.findFirst({
      where: {
        id,
      },
    });
    if (!candidate) {
      logger.error('Отзыв не найден');
      throw new HttpException(`Отзыв не найден`, HttpStatus.BAD_REQUEST);
    }
    if (candidate.userId !== user['sub']) {
      logger.error('Вы не можете изменить чужой отзыв');
      throw new HttpException(
        `Вы не можете изменить чужой отзыв`,
        HttpStatus.BAD_REQUEST
      );
    }
    await this.prisma.comment.update({
      where: {
        id,
      },
      data: {
        comment: dto.comment,
      },
    });
    return { message: 'Отзыв успешно обновлен' };
  }

  async delete(id: number, token: string) {
    const access_token = token.split(' ')[1];
    const user = this.jwt.decode(access_token);
    const candidate = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });
    if (!candidate) {
      logger.error('Отзыва не найден');
      throw new HttpException(`Отзыва не найден`, HttpStatus.BAD_REQUEST);
    }
    if (user['sub'] !== candidate.userId) {
      logger.error('Вы не можете удалить чужой отзыв');
      throw new HttpException(
        `Вы не можете удалить чужой отзыв`,
        HttpStatus.BAD_REQUEST
      );
    }
    await this.prisma.comment.delete({
      where: {
        id,
      },
    });
    return { message: 'Отзыв успешно удален' };
  }
}
