import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TypeService } from './type.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { createTypeDto } from '@store/interface';
import { Roles } from '../auth/roles-auth.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Категория')
@Controller('type')
export class TypeController {
  constructor(private service: TypeService) {}

  @ApiOperation({ summary: 'Создание категории' })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  create(@Body() dto: createTypeDto) {
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
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/:id')
  update(@Param('id') id: string, @Body() dto: { name: string }) {
    return this.service.update({ id: parseInt(id), name: dto.name });
  }

  @ApiOperation({ summary: 'Удалить категорию' })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.delete({ id: parseInt(id) });
  }
}
