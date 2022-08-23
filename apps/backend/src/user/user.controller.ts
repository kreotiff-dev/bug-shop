import { Controller, Headers, Get, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  getMe(@Headers('Authorization') token: string) {
    return this.service.getMe({ token });
  }

  @Delete('')
  @UseGuards(JwtAuthGuard)
  deleteMe(@Headers('Authorization') token: string) {
    return this.service.deleteMe({ token });
  }
}
