import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class createBrandDto {
  @ApiProperty({
    title: 'Название бренда',
    type: String,
    example:'apple',
    uniqueItems: true
  })
  @IsNotEmpty({message:'Поле name не может быть пустым'})
  name!: string;
}
