import {
  Controller,
  Post,
  UseGuards,
  Headers,
  Body,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BasketService } from './basket.service';

@ApiTags('Корзина')
@Controller('basket')
export class BasketController {
  constructor(private service: BasketService) {}

  @ApiOperation({ summary: 'Добавить устройство в корзину' })
  @Post('/add-device')
  @UseGuards(JwtAuthGuard)
  addDevice(
    @Headers('Authorization') token: string,
    @Body() dto: { idDevice: number }
  ) {
    return this.service.addDevice(token, dto);
  }

  @ApiOperation({ summary: 'Получить все устройства с корзины' })
  @Get('/device')
  @UseGuards(JwtAuthGuard)
  getBasketDevice(@Headers('Authorization') token: string) {
    return this.service.getBasketDevice(token);
  }

  @ApiOperation({ summary: 'Получить сумму стоимости устройств в корзину' })
  @Get('/price')
  @UseGuards(JwtAuthGuard)
  getTotalPrice(@Headers('Authorization') token: string) {
    return this.service.getTotalPrice(token);
  }

  @ApiOperation({ summary: 'Изменить кол-во устройства в корзине' })
  @Patch('')
  @UseGuards(JwtAuthGuard)
  updateCountDevice(
    @Headers('Authorization') token: string,
    @Body() dto: { count: number; idDevice: number }
  ) {
    return this.service.updateCountDevice(token, dto);
  }

  @ApiOperation({ summary: 'Удалить устройство из корзины' })
  @Delete('')
  @UseGuards(JwtAuthGuard)
  deleteDevice(
    @Headers('Authorization') token: string,
    @Body() dto: { idDevice: number }
  ) {
    return this.service.deleteDevice(token, dto);
  }

  @ApiOperation({ summary: 'Проверить, есть ли в корзине устройство' })
  @Post('/is-basket')
  @UseGuards(JwtAuthGuard)
  isBasket(
    @Headers('Authorization') token: string,
    @Body() dto: { idDevice: number }
  ) {
    return this.service.isBasket(token, dto);
  }
}
