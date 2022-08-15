import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { createBrandDto } from '@store/interface';

@ApiTags('Бренд')
@Controller('brand')
export class BrandController {
  constructor(private service: BrandService) {}

  @ApiOperation({ summary: 'Создание бренда' })
  @Post('/')
  create(@Body() dto: createBrandDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Получить все бренды' })
  @Get('')
  getAll() {
    return this.service.getAll();
  }

  @ApiOperation({ summary: 'Получить определенный бренд' })
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.service.getById({ id: parseInt(id) });
  }

  @ApiOperation({ summary: 'Изменить данные бренда' })
  @Patch('/:id')
  update(@Param('id') id: string, @Body() dto: { name: string }) {
    return this.service.update({ id: parseInt(id), name: dto.name });
  }

  @ApiOperation({ summary: 'Удалить бренд' })
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.delete({ id: parseInt(id) });
  }
}
