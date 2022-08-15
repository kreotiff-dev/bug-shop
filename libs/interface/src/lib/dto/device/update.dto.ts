import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateDeviceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Название товара',
    type: String
  })
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Цена товара',
    type: Number
  })
  price!: number;

  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty({
  //   description: 'Название товара',
  //   type: String
  // })
  // img!: string;
}
