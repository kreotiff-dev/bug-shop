import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class updateCommentDto {
  @ApiProperty({
    title: 'Отзыв пользователя',
    example: 'Товар очень понравился',
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'Id не может быть пустым значением' })
  @MinLength(10, { message: 'Введите отзыв более 10 символов' })
  comment!: string;
}
