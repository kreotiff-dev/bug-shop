import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class deviceInfo {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Название характеристики',
    type: String
  })
  title!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Значение характеристики',
    type: String
  })
  description!: string;
}
