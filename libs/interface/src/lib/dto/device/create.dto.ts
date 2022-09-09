import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
export class CreateDeviceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    title: 'Название товара',
    type: String,
    example: 'iPhone 11',
    uniqueItems: true
  })
  name!: string;

  @IsNotEmpty()
  @ApiProperty({
    title: 'Стоимость товара',
    example:'70 000'
  })
  price!: string;

  @IsNotEmpty()
  @ApiProperty({
    title: 'Id категории',
    example: '1'
  })
  typeId!: string;

  @IsNotEmpty()
  @ApiProperty({
    title: 'Id бренда',
    example: '1'
  })
  brandId!: string;

  @ApiProperty({
    title: 'Характеристики',
    description: 'Принимает массив объектов в виде строки',
    example: '[{"title":"Вес","description":"400г"},{"title":"Основная камера","description":"12мп"}]'
  })
  info?: string;
}
