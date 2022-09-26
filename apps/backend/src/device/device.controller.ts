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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import {
  CreateDeviceDto,
  queryDeviceDto,
  UpdateDeviceDto,
} from '@store/interface';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiHeaders,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Товар')
@Controller('device')
export class DeviceController {
  constructor(private service: DeviceService) {}

  @ApiOperation({
    summary: 'Создание товара',
    description: 'Позволяет администратору создать товар',
  })
  @ApiResponse({
    description: 'Возвращает сообщение об успешном создании',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Пользователь не авторизован',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    description: 'Нет прав доступа',
    status: HttpStatus.FORBIDDEN,
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'Токен авторизации',
    },
  ])
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  create(
    @Body()
    dto: CreateDeviceDto,
    @UploadedFile() file
  ) {
    return this.service.create(dto, file);
  }

  @ApiOperation({
    summary: 'Получить все товары',
    description: 'Позволяет получить все товары',
  })
  @ApiResponse({
    description: 'Возвращает массив устройств и общее кол-во',
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getAll(@Query() query: queryDeviceDto) {
    return await this.service.getAll(query);
  }

  @ApiOperation({
    summary: 'Получить товар по id',
    description: 'Позволяет получить определенное устройство по id',
  })
  @ApiResponse({
    description: 'Возвращает данные устройства',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Устройство не найдено',
    status: HttpStatus.BAD_REQUEST,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.service.getById({ id: parseInt(id) });
  }

  @ApiOperation({
    summary: 'Получить полную информацию о товаре',
    description:
      'Позволяет получить данные устройства, категории и бренда, характеристики',
  })
  @ApiResponse({ description: 'Возвращает данные', status: HttpStatus.OK })
  @ApiResponse({
    description: 'Устройство не найдено',
    status: HttpStatus.BAD_REQUEST,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/full/:id')
  getFullInfo(@Param('id') id: string) {
    return this.service.getFullInfo({ id: parseInt(id) });
  }

  @ApiOperation({
    summary: 'Получить все характеристики товара',
    description: 'Позволяет получить характеристики по id устройства',
  })
  @ApiResponse({
    description: 'Возвращает характеристики устройства',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Устройство не найдено',
    status: HttpStatus.BAD_REQUEST,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/info/:id')
  getInfo(@Param('id') id: string) {
    return this.service.getInfo({ id: parseInt(id) });
  }

  @ApiOperation({
    summary: 'Изменить данные о товаре',
    description:
      'Позволяет администратору изменить данные определенного товара',
  })
  @ApiResponse({
    description: 'Возвращает сообщение об успешном обновлении',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Пользователь не авторизован',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    description: 'Нет прав доступа',
    status: HttpStatus.FORBIDDEN,
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'Токен авторизации',
    },
  ])
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/:id')
  update(
    @Body() dto: UpdateDeviceDto,
    @Param('id') id: string,
    @UploadedFile() file
  ) {
    return this.service.update({ id: parseInt(id), ...dto }, file);
  }

  @ApiOperation({
    summary: 'Удалить товар',
    description: 'Позволяет администратору удалить устройство',
  })
  @ApiResponse({
    description: 'Возвращает сообщение об успешном удалении',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Пользователь не авторизован',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    description: 'Нет прав доступа',
    status: HttpStatus.FORBIDDEN,
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'Токен авторизации',
    },
  ])
  @HttpCode(HttpStatus.OK)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.delete({ id: parseInt(id) });
  }
}
