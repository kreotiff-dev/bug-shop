import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TypeService } from './type.service';
import { ApiTags, ApiOperation, ApiResponse, ApiHeaders, ApiQuery } from '@nestjs/swagger';
import { createTypeDto, nameDto } from '@store/interface';
import { Roles } from '../auth/roles-auth.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Категория')
@Controller('type')
export class TypeController {
  constructor(private service: TypeService) {}

  @ApiOperation({ summary: 'Создание категории', description:'Позволяет администратору создать категорию' })
  @ApiResponse({description:'Возвращает сообщение об успешном создании', status: HttpStatus.OK})
  @ApiResponse({description:'Пользователь не авторизован', status: HttpStatus.UNAUTHORIZED})
  @HttpCode(HttpStatus.OK)
  @ApiHeaders([
    {
      name:'Authorization',
      description:'Токен авторизации',
    }
  ])
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  create(@Body() dto: createTypeDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Получить все категории',description:'Позволяет получить все категории' })
  @ApiResponse({description:'Возвращает массив категорий и общее кол-во', status: HttpStatus.OK})
  @HttpCode(HttpStatus.OK)
  @Get('')
  getAll(@Query() query: { page?: string; limit?: string }) {
    return this.service.getAll(query);
  }

  @ApiOperation({ summary: 'Получить категорию', description:'Позволяет получить определенную категорию по id'})
  @ApiResponse({description:'Возвращает данные категории', status: HttpStatus.OK})
  @ApiResponse({description:'Категория не найдена', status: HttpStatus.BAD_REQUEST})
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.service.getById({ id: parseInt(id) });
  }

  @ApiOperation({ summary: 'Изменить категорию',description:'Позволяет администратору изменить название категории' })
  @ApiResponse({description:'Возвращает сообщение об успешном обновлении', status: HttpStatus.OK})
  @ApiResponse({description:'Пользователь не авторизован', status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({description:'Нет прав доступа1', status: HttpStatus.FORBIDDEN})
  @ApiHeaders([
    {
      name:'Authorization',
      description:'Токен авторизации',
    }
  ])
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/:id')
  update(@Param('id') id: string, @Body() dto: nameDto) {
    return this.service.update({ id: parseInt(id), name: dto.name });
  }

  @ApiOperation({ summary: 'Удалить категорию',description:'Позволяет администратору удалить категорию' })
  @ApiResponse({description:'Возвращает сообщение об успешном удалении', status: HttpStatus.OK})
  @ApiResponse({description:'Пользователь не авторизован', status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({description:'Нет прав доступа', status: HttpStatus.FORBIDDEN})
  @ApiHeaders([
    {
      name:'Authorization',
      description:'Токен авторизации',
    }
  ])
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.delete({ id: parseInt(id) });
  }
}
