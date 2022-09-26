import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [CommentService],
  controllers: [CommentController],
  imports: [AuthModule, JwtModule],
})
export class CommentModule {}
