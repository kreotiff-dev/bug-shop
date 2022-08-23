import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class UpdateInfoDeviceDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Id характеристики',
    type: Number,
  })
  id!: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Значение характеристики',
    type: String,
  })
  description!: string;
}
