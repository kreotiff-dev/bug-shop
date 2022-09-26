import {
  Controller,
  Post,
  UseGuards,
  Headers,
  Body,
  Get,
  Patch,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiHeaders, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { idDeviceDto, updateCountDto } from '@store/interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BasketService } from './basket.service';

@ApiTags('Корзина')
@Controller('basket')
export class BasketController {
  constructor(private service: BasketService) {}

  @ApiOperation({ summary: 'Добавить устройство в корзину',description:'Позволяет пользователю добавить устройство в корзину' })
  @ApiResponse({description:'Возвращает сообщение об успешном добавлении', status: HttpStatus.OK})
  @ApiResponse({description:'Пользователь не авторизован', status: HttpStatus.UNAUTHORIZED})
  @ApiHeaders([
    {
      name:'Authorization',
      description:'Токен авторизации',
    }
  ])
  @HttpCode(HttpStatus.OK)
  @Post('/add-device')
  @UseGuards(JwtAuthGuard)
  addDevice(
    @Headers('Authorization') token: string,
    @Body()  dto: idDeviceDto
  ) {
    return this.service.addDevice(token, dto);
  }

  @ApiOperation({ summary: 'Получить все устройства с корзины',description:'Позволяет пользователю получить все устройства с его корзины' })
  @ApiResponse({description:'Возвращает массив устройств корзины', status: HttpStatus.OK})
  @ApiResponse({description:'Пользователь не авторизован', status: HttpStatus.UNAUTHORIZED})
  @ApiHeaders([
    {
      name:'Authorization',
      description:'Токен авторизации',
    }
  ])
  @HttpCode(HttpStatus.OK)
  @Get('/device')
  @UseGuards(JwtAuthGuard)
  getBasketDevice(@Headers('Authorization') token: string) {
    return this.service.getBasketDevice(token);
  }

  @ApiOperation({ summary: 'Получить сумму стоимости устройств в корзину',description:'Позволяет пользователю получить текущую сумму стоимости товаров, которые он добавил в корзину' })
  @ApiResponse({description:'Возвращает общую стоимость корзины', status: HttpStatus.OK})
  @ApiResponse({description:'Пользователь не авторизован', status: HttpStatus.UNAUTHORIZED})
  @ApiHeaders([
    {
      name:'Authorization',
      description:'Токен авторизации',
    }
  ])
  @HttpCode(HttpStatus.OK)
  @Get('/price')
  @UseGuards(JwtAuthGuard)
  getTotalPrice(@Headers('Authorization') token: string) {
    return this.service.getTotalPrice(token);
  }

  @ApiOperation({ summary: 'Изменить кол-во устройства в корзине',description:'Позволяет пользователю изменить кол-во штук определенного товара в его корзине' })
  @ApiResponse({description:'Возвращает сообщение об успешном изменении', status: HttpStatus.OK})
  @ApiResponse({description:'Пользователь не авторизован', status: HttpStatus.UNAUTHORIZED})
  @ApiHeaders([
    {
      name:'Authorization',
      description:'Токен авторизации',
    }
  ])
  @HttpCode(HttpStatus.OK)
  @Patch('')
  @UseGuards(JwtAuthGuard)
  updateCountDevice(
    @Headers('Authorization') token: string,
    @Body() dto: updateCountDto
  ) {
    return this.service.updateCountDevice(token, dto);
  }

  @ApiOperation({ summary: 'Удалить устройство из корзины',description:'Позволяет пользователю удалить устройство из корзины' })
  @ApiResponse({description:'Возвращает сообщение об успешном удалении', status: HttpStatus.OK})
  @ApiResponse({description:'Пользователь не авторизован', status: HttpStatus.UNAUTHORIZED})
  @ApiHeaders([
    {
      name:'Authorization',
      description:'Токен авторизации',
    }
  ])
  @HttpCode(HttpStatus.OK)@Delete('')
  @UseGuards(JwtAuthGuard)
  deleteDevice(
    @Headers('Authorization') token: string,
    @Body() dto: idDeviceDto
  ) {
    return this.service.deleteDevice(token, dto);
  }

  @ApiOperation({ summary: 'Проверить, есть ли в корзине устройство', description:'Позволяет узнать, есть ли данное устройство в корзине' })
  @ApiResponse({description:'Возвращает true или false', status: HttpStatus.OK})
  @ApiResponse({description:'Пользователь не авторизован', status: HttpStatus.UNAUTHORIZED})
  @ApiHeaders([
    {
      name:'Authorization',
      description:'Токен авторизации',
    }
  ])
  @HttpCode(HttpStatus.OK)
  @Post('/is-basket')
  @UseGuards(JwtAuthGuard)
  isBasket(
    @Headers('Authorization') token: string,
    @Body() dto: idDeviceDto
  ) {
    return this.service.isBasket(token, dto);
  }
}
