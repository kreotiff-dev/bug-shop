import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class createBrandDto {
  @ApiProperty({
    description: 'Название бренда',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
