import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
export class CreateDeviceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Название товара',
    type: String,
  })
  name!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty({
    description: 'Стоимость товара',
    type: Number,
  })
  price!: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty({
    description: 'Id категории',
    type: Number,
  })
  typeId!: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty({
    description: 'Id бренда',
    type: Number,
  })
  brandId!: number;
}
