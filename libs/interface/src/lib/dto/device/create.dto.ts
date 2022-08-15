import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateDeviceDto {
  // @IsNotEmpty()
  // @IsString()
  @ApiProperty({
    description: 'Название товара',
    type: String
  })
  name!: string;

  // @IsNotEmpty()
  // @IsNumber()
  @ApiProperty({
    description: 'Стоимость товара',
    type: Number
  })
  price!: number;

  // @IsNotEmpty()
  // @IsNumber()
  @ApiProperty({
    description: 'Id категории',
    type: Number
  })
  typeId!: number;

  // @IsNotEmpty()
  // @IsNumber()
  @ApiProperty({
    description: 'Id бренда',
    type: Number
  })
  brandId!: number;
}
