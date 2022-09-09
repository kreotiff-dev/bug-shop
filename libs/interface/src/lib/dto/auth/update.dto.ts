import { ApiProperty } from '@nestjs/swagger';
import { Sex } from '@prisma/client';
import { IsEmail, Length } from 'class-validator';

export class updateUserDto {
  @ApiProperty({
    title: 'Почта',
    type: String,
    example:'admin@mail.ru',
    required:false
  })
  @IsEmail({message:'Введите почту'})
  @Length(5, 50,{message:'Поле должно быть длиннее 5 символов и короче 50'})
  email?: string;

  @ApiProperty({
    title: 'Имя',
    type: String,
    example:'Павел',
    required:false
  })
  name?: string;
  
  @ApiProperty({
    title: 'Фамилия',
    type: String,
    example:'Петров',
    required:false
  })
  surname?: string;

  @ApiProperty({
    title: 'Телефон',
    type: String,
    example:'79771234567',
    required:false
  })
  phone?: string;
  
  @ApiProperty({
    title:'Дата рождения',
    format:'9999999999',
    type: String,
    example:'1662640769',
    required:false
  })
  bithday?: number;
    
  @ApiProperty({
    title:'Пол',
    type: String,
    example:'MALE',
    required:false,
    enum: Sex,
  })
  sex?: Sex;
}
