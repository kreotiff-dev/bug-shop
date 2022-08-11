import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { UserModule } from './user/user.module';
import { BrandModule } from './brand/brand.module';
import { TypeModule } from './type/type.module';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [
    PrismaModule.forRoot({ isGlobal: true }),
    UserModule,
    BrandModule,
    TypeModule,
    DeviceModule,
  ],
})
export class AppModule {}
