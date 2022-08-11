import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto, deviceInfo, UpdateDeviceDto } from '@store/interface';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Товар')
@Controller('device')
export class DeviceController {
  constructor(private service: DeviceService) {}

  @ApiOperation({ summary: 'Создание товара' })
  @Post('/')
  create(@Body() dto: CreateDeviceDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Создать характеристику товар' })
  @Post('/info/:id')
  addInfo(@Body() dto: deviceInfo, @Param('id') id: string) {
    return this.service.addInfo({
      ...dto,
      deviceId: parseInt(id),
    });
  }

  @ApiOperation({ summary: 'Получить все товары' })
  @Get('/')
  getAll() {
    return this.service.getAll();
  }

  @ApiOperation({ summary: 'Получить товар по id' })
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.service.getById({ id: parseInt(id) });
  }

  @ApiOperation({ summary: 'Получить все характеристики товара' })
  @Get('/info/:id')
  getInfo(@Param('id') id: string) {
    return this.service.getInfo({ id: parseInt(id) });
  }

  @ApiOperation({ summary: 'Изменить данные о товаре' })
  @Patch('/:id')
  update(@Body() dto: UpdateDeviceDto, @Param('id') id: string) {
    return this.service.update({
      id: parseInt(id),
      ...dto,
    });
  }

  @ApiOperation({ summary: 'Удалить товар' })
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.delete({ id: parseInt(id) });
  }
}
