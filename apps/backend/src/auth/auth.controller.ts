import { Body, Controller, Post, Req, Res, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from '@store/interface';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @ApiOperation({ summary: 'Вход', description:'Позволяет пользователю авторизироваться в системе' })
  @ApiResponse({description:'Возвращает пару access и refresh токенов', status: HttpStatus.OK})
  @ApiResponse({description:'Логин или пароль не верный', status: HttpStatus.BAD_REQUEST})
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = await this.service.login(dto);
    response.cookie('refreshToken', data.refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return data;
  }
  //registration
  @ApiOperation({ summary: 'Регистрация',description:'Позволяет пользователю зарегистрироваться' })
  @ApiResponse({description:'Возвращает пару access и refresh токенов', status: HttpStatus.OK})
  @ApiResponse({description:'Логин или пароль не верный', status: HttpStatus.BAD_REQUEST})
  @HttpCode(HttpStatus.OK)
  @Post('registration')
  async registration(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const data = await this.service.registration(dto);
    response.cookie('refreshToken', data.refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      //   maxAge: 60 * 1000,
      httpOnly: true,
    });
    return data;
  }

  @ApiOperation({ summary: 'Выход из системы',description:'Позволяет пользователю выйти из своей учетной записи' })
  @ApiResponse({description:'Возвращает сообщение об успешном выходе', status: HttpStatus.OK})
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const refreshToken = request.cookies['refreshToken'];
    const token = await this.service.logout(refreshToken);
    response.clearCookie('refreshToken');
    return token;
  }

  @ApiOperation({ summary: 'Запрос на обновление токенов',description:'Позволяет пользователю получить новую пару токенов' })
  @ApiResponse({description:'Возвращает пару access и refresh токенов', status: HttpStatus.OK})
  @ApiResponse({ description: 'Токен устарел', status: HttpStatus.UNAUTHORIZED })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Req() request: Request, @Res() response: Response) {
    const refreshToken = request.cookies['refreshToken'];
    const data = await this.service.refresh(refreshToken);
    response.cookie('refreshToken', data.refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      //   maxAge: 60 * 1000,
      httpOnly: true,
    });
    return response.json(data);
  }
}
