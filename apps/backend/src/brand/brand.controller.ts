import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { createBrandDto } from '@store/interface';
import { Roles } from '../auth/roles-auth.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Бренд')
@Controller('brand')
export class BrandController {
  constructor(private service: BrandService) {}

  @ApiOperation({ summary: 'Создание бренда' })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  create(@Body() dto: createBrandDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Получить все бренды' })
  @Get('')
  getAll(@Query() query: { page?: string; limit?: string }) {
    return this.service.getAll(query);
  }

  @ApiOperation({ summary: 'Получить определенный бренд' })
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.service.getById({ id: parseInt(id) });
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Изменить данные бренда' })
  @Patch('/:id')
  update(@Param('id') id: string, @Body() dto: { name: string }) {
    return this.service.update({ id: parseInt(id), name: dto.name });
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Удалить бренд' })
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.delete({ id: parseInt(id) });
  }
}
