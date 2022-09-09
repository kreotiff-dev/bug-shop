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
import { BrandService } from './brand.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiHeaders } from '@nestjs/swagger';
import { createBrandDto, nameDto } from '@store/interface';
import { Roles } from '../auth/roles-auth.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Бренд')
@Controller('brand')
export class BrandController {
  constructor(private service: BrandService) {}

  @ApiOperation({ summary: 'Создание бренда',description:'Позволяет администратору создать бренд' })
  @ApiResponse({description:'Возвращает сообщение об успешном создании', status: HttpStatus.OK})
  @ApiResponse({description:'Пользователь не авторизован', status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({description:'Нет прав доступа', status: HttpStatus.FORBIDDEN})
  @ApiHeaders([
    {
      name:'Authorization',
      description:'Токен авторизации',
    }
  ])
  @HttpCode(HttpStatus.OK)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  create(@Body() dto: createBrandDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Получить все бренды', description:'Позволяет получить все бренды' })
  @ApiResponse({description:'Возвращает массив брендов и общее кол-во', status: HttpStatus.OK})
  @HttpCode(HttpStatus.OK)
  @Get('')
  getAll(@Query() query: { page?: string; limit?: string }) {
    return this.service.getAll(query);
  }

  @ApiOperation({ summary: 'Получить определенный бренд',description:'Позволяет получить определенные бренд по id' })
  @ApiResponse({description:'Возвращает данные бренда', status: HttpStatus.OK})
  @ApiResponse({description:'Бренд не найден', status: HttpStatus.BAD_REQUEST})
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.service.getById({ id: parseInt(id) });
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Изменить данные бренда',description:'Позволяет администратору изменить название бренда' })
  @ApiResponse({description:'Возвращает сообщение об успешном обновлении', status: HttpStatus.OK})
  @ApiResponse({description:'Пользователь не авторизован', status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({description:'Нет прав доступа1', status: HttpStatus.FORBIDDEN})
  @ApiHeaders([
    {
      name:'Authorization',
      description:'Токен авторизации',
    }
  ])
  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  update(@Param('id') id: string, @Body() dto: nameDto) {
    return this.service.update({ id: parseInt(id), name: dto.name });
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Удалить бренд',description:'Позволяет администратору удалить бренд' })
  @ApiResponse({description:'Возвращает сообщение об успешном удалении', status: HttpStatus.OK})
  @ApiResponse({description:'Пользователь не авторизован', status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({description:'Нет прав доступа', status: HttpStatus.FORBIDDEN})
  @ApiHeaders([
    {
      name:'Authorization',
      description:'Токен авторизации',
    }
  ])
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.delete({ id: parseInt(id) });
  }
}
