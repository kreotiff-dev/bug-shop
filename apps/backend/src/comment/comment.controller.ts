import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Headers,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiHeaders, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { commentDto, updateCommentDto } from '@store/interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private service: CommentService) {}
  //Создание комментария
  @ApiOperation({
    summary: 'Создание комментария',
    description: 'Позволяет пользователю оставить комментарий',
  })
  @ApiResponse({
    description: 'Возвращает сообщение об успешном создании',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Пользователь не авторизован',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'Токен авторизации',
    },
  ])
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('/')
  create(
    @Headers('Authorization') token: string,
    @Body()
    dto: commentDto
  ) {
    return this.service.create(dto, token);
  }
  // получить комментарии устройства
  @ApiOperation({
    summary: 'Получить все комментарии определенного устройства',
    description:
      'Позволяет пользователю получить посмотреть все комментарии выбранного устройства',
  })
  @ApiResponse({
    description: 'Возвращает массив комментариев устройства',
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/device/:id')
  getCommentsDevice(@Param('id') id: string) {
    return this.service.getCommentsDevice(parseInt(id));
  }
  //Получить комментарий комментарий пользователя по id
  @ApiOperation({
    summary: 'Получить все комментарии определенного устройства',
    description:
      'Позволяет пользователю получить посмотреть все комментарии выбранного устройства',
  })
  @ApiResponse({
    description: 'Возвращает массив комментариев устройства',
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getCommentById(
    @Param('id') id: string,
    @Headers('Authorization') token: string
  ) {
    return this.service.getCommentById(parseInt(id), token);
  }
  //Обновить комментарий
  @ApiOperation({
    summary: 'Изменить комментарий',
    description:
      'Позволяет пользователю изменить комментарий определенного товара',
  })
  @ApiResponse({
    description: 'Возвращает сообщение об успешном обновлении',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Пользователь не авторизован',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'Токен авторизации',
    },
  ])
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  update(
    @Body() dto: updateCommentDto,
    @Headers('Authorization') token: string,
    @Param('id') id: string
  ) {
    return this.service.update(dto, token, parseInt(id));
  }
  //Удалить комментарий
  @ApiOperation({
    summary: 'Удалить комментарий',
    description:
      'Позволяет пользователю удалить свой комментарий определенного устройства',
  })
  @ApiResponse({
    description: 'Возвращает сообщение об успешном удалении',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Пользователь не авторизован',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'Токен авторизации',
    },
  ])
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param('id') id: string, @Headers('Authorization') token: string) {
    return this.service.delete(parseInt(id), token);
  }
}
