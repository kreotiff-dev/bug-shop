import {
  Controller,
  Headers,
  Get,
  Delete,
  UseGuards,
  Patch,
  Body,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiHeaders, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { passwordDto, resetPassword, updateUserDto } from '@store/interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';

@ApiTags('Личный кабинет')
@Controller('user')
export class UserController {
  constructor(private service: UserService) { }

  // @Get('/getUsers')

  // @ApiBearerAuth('Authorization')
  // async getUsers(){
  //   return ['test', 'test2']
  // }

    @ApiOperation({
      summary: 'Получить информацию об аккаунте',
      description: 'Позволяет пользователю получить информацию о данных о своей учетной записи',
    })
    @ApiResponse({ description: 'Возвращает данные о пользователе', status: HttpStatus.OK })
    @ApiResponse({ description: 'Пользователь не авторизован', status: HttpStatus.UNAUTHORIZED })
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
  @Get('')
  getMe(token: string) {
    return this.service.getMe({ token });
  }

  @ApiOperation({
    summary: 'Получить информацию об аккаунте по Id',
    description: 'Позволяет получить информацию о данных аккаунта',
  })
  @ApiResponse({description:'Возвращает данные о пользователе', status: HttpStatus.OK})
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.service.getById(parseInt(id));
  }



  @ApiOperation({
    summary: 'Изменить данные аккаунта',
    description: 'Позволяет пользователю изменить данные учетной записи',
  })
  @ApiResponse({description:'Возвращает новую пару', status: HttpStatus.OK})
  @ApiResponse({description:'Пользователь не авторизован', status: HttpStatus.UNAUTHORIZED})
  @ApiHeaders([
    {
      name:'Authorization',
      description:'Токен авторизации',
    }
  ])
  @HttpCode(HttpStatus.OK)
  @Patch('/')
  @UseGuards(JwtAuthGuard)
  update(@Headers('Authorization') token: string, @Body() dto: updateUserDto) {
    return this.service.update(token, dto);
  }

  @ApiOperation({
    summary: 'Удалить учетную запись',
    description: 'Позволяет пользователю удалить свою учетную запись',
  })
  @ApiResponse({description:'Возвращает сообщение об успешном удалении', status: HttpStatus.OK})
  @ApiResponse({description:'Пользователь не авторизован', status: HttpStatus.UNAUTHORIZED})
  @ApiHeaders([
    {
      name:'Authorization',
      description:'Токен авторизации',
    }
  ])
  @HttpCode(HttpStatus.OK)
  @Delete('')
  @UseGuards(JwtAuthGuard)
  deleteMe(
    @Headers('Authorization') token: string,
    @Body() dto: passwordDto
  ) {
    return this.service.deleteMe({ token, password: dto.password });
  }

  @ApiOperation({
    summary: 'Изменить пароль',
    description: 'Позволяет пользователю изменить пароль',
  })
  @ApiResponse({description:'Возвращает сообщение об успешном изменении пароля', status: HttpStatus.OK})
  @ApiResponse({description:'Пользователь не авторизован', status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({description:'Пароль не верный', status: HttpStatus.BAD_REQUEST})
  @HttpCode(HttpStatus.OK)
  @Patch('/password')
  @UseGuards(JwtAuthGuard)
  updatePassword(
    @Headers('Authorization') token: string,
    @Body() dto: resetPassword
  ) {
    return this.service.updatePassword(token, dto);
  }
}
