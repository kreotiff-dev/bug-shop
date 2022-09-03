import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';

@Module({
  imports: [JwtModule, AuthModule],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
