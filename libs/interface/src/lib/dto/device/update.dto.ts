import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateDeviceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Название товара',
    type: String,
  })
  name!: string;

  @IsNotEmpty()
  // @IsInt()
  // @Min(0)
  @ApiProperty({
    description: 'Стоимость товара',
    // type: Number,
  })
  price!: string;

  @IsNotEmpty()
  // @IsInt()
  // @Min(1)
  @ApiProperty({
    description: 'Id категории',
    // type: Number,
  })
  typeId!: string;

  @IsNotEmpty()
  // @IsInt()
  // @Min(1)
  @ApiProperty({
    description: 'Id бренда',
    // type: Number,
  })
  brandId!: string;

  @ApiProperty({
    description: 'Характеристики',
  })
  info?: string;
}
