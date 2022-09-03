import {
  Controller,
  Headers,
  Get,
  Delete,
  UseGuards,
  Patch,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { updateUserDto } from '@store/interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';

@ApiTags('Личный кабинет')
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @ApiOperation({
    summary: 'Получить информацию об аккаунте',
    description: 'Используя токен',
  })
  @Get('')
  @UseGuards(JwtAuthGuard)
  getMe(@Headers('Authorization') token: string) {
    return this.service.getMe({ token });
  }

  @ApiOperation({
    summary: 'Изменить данные аккаунта',
    description: 'Используя токен',
  })
  @Patch('/')
  @UseGuards(JwtAuthGuard)
  update(@Headers('Authorization') token: string, @Body() dto: updateUserDto) {
    return this.service.update(token, dto);
  }

  @ApiOperation({
    summary: 'Удалить аккаунта',
    description: 'Используя токен',
  })
  @Delete('')
  @UseGuards(JwtAuthGuard)
  deleteMe(
    @Headers('Authorization') token: string,
    @Body() dto: { password: string }
  ) {
    return this.service.deleteMe({ token, password: dto.password });
  }

  @ApiOperation({
    summary: 'Удалить аккаунта',
    description: 'Используя токен',
  })
  @Patch('/password')
  @UseGuards(JwtAuthGuard)
  updatePassword(
    @Headers('Authorization') token: string,
    @Body() dto: { newPassword: string; oldPassword: string }
  ) {
    return this.service.updatePassword(token, dto);
  }
}
