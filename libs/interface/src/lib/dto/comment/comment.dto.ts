import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, MinLength } from 'class-validator';

export class commentDto {
  @ApiProperty({
    title: 'id устройства',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNotEmpty({ message: 'Id не может быть пустым значением' })
  @IsInt({ message: 'Id должен быть числом' })
  idDevice!: number;
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
