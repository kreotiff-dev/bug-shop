import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { UserModule } from './user/user.module';
import { BrandModule } from './brand/brand.module';
import { TypeModule } from './type/type.module';
import { DeviceModule } from './device/device.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule.forRoot({ isGlobal: true }),
    UserModule,
    BrandModule,
    TypeModule,
    DeviceModule,
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        '..',
        '..',
        'apps',
        'backend',
        'src',
        'static'
      ),
    }),
    AuthModule,
  ],
})
export class AppModule {}
