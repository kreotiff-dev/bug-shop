import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TypeService } from './type.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Категория')
@Controller('type')
export class TypeController {
  constructor(private service: TypeService) {}

  @ApiOperation({ summary: 'Создание категории' })
  @Post('/')
  create(@Body() dto: { name: string }) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Получить все категории' })
  @Get('')
  getAll() {
    return this.service.getAll();
  }

  @ApiOperation({ summary: 'Получить категорию' })
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.service.getById({ id: parseInt(id) });
  }

  @ApiOperation({ summary: 'Изменить категорию' })
  @Patch('/:id')
  update(@Param('id') id: string, @Body() dto: { name: string }) {
    return this.service.update({ id: parseInt(id), name: dto.name });
  }

  @ApiOperation({ summary: 'Удалить категорию' })
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.delete({ id: parseInt(id) });
  }
}
