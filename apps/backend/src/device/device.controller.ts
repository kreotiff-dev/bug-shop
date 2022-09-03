import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import {
  CreateDeviceDto,
  deviceInfo,
  queryDeviceDto,
  UpdateDeviceDto,
} from '@store/interface';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Request, Response } from 'express';

@ApiTags('Товар')
@Controller('device')
export class DeviceController {
  constructor(private service: DeviceService) {}

  @ApiOperation({ summary: 'Создание товара' })
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

  @ApiOperation({ summary: 'Получить все товары' })
  @Get('/')
  async getAll(@Query() query: queryDeviceDto) {
    return await this.service.getAll(query);
  }

  @ApiOperation({ summary: 'Получить товар по id' })
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.service.getById({ id: parseInt(id) });
  }

  @ApiOperation({ summary: 'Получить полную информацию о товаре' })
  @Get('/full/:id')
  getFullInfo(@Param('id') id: string) {
    return this.service.getFullInfo({ id: parseInt(id) });
  }

  @ApiOperation({ summary: 'Получить все характеристики товара' })
  @Get('/info/:id')
  getInfo(@Param('id') id: string) {
    return this.service.getInfo({ id: parseInt(id) });
  }

  @ApiOperation({ summary: 'Изменить данные о товаре' })
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

  @ApiOperation({ summary: 'Удалить товар' })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.delete({ id: parseInt(id) });
  }
}
