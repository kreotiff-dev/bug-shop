import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthDto } from '@store/interface';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @ApiOperation({ summary: 'Вход' })
  @Post('login')
  async login(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const data = await this.service.login(dto);
    response.cookie('refreshToken', data.refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return data;
  }
  //registration
  @ApiOperation({ summary: 'Регистрация' })
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

  @ApiOperation({ summary: 'Выход из системы' })
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

  @ApiOperation({ summary: 'Запрос на обновление refresh token' })
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
