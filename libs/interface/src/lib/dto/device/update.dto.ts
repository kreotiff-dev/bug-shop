import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateDeviceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    title: 'Название товара',
    type: String,
    example: 'iPhone 11 PRO',
    required: false
  })
  name?: string;

  @IsNotEmpty()
  @ApiProperty({
    title: 'Стоимость товара',
    example: '71000',
    required: false
  })
  price?: string;

  @IsNotEmpty()
  @ApiProperty({
    title: 'Id категории',
    example: '1',
    required: false
  })
  typeId?: string;

  @IsNotEmpty()
  @ApiProperty({
    title: 'Id бренда',
    example:'1',
    required: false
  })
  brandId?: string;

  @ApiProperty({
    title: 'Характеристики',
    example: '[{"title":"Вес","title":"520г"},{"title":"Основная камера","title":"8мп"}]',
    required: false
  })
  info?: string;
}
