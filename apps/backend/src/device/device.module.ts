import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { FileModule } from '../file/file.module';
import { AuthModule } from '../auth/auth.module';
@Module({
  providers: [DeviceService],
  controllers: [DeviceController],
  imports: [FileModule, AuthModule],
})
export class DeviceModule {}
