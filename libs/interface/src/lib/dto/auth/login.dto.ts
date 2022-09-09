import { message } from 'antd';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class AuthDto {
  @ApiProperty({
    title: 'Почта',
    type: String,
    example:'admin@mail.ru'
  })
  @IsEmail({message:'Введите почту'})
  @IsNotEmpty({message:'Поле не может быть пустым'})
  @Length(5, 50,{message:'Поле должно быть длиннее 5 символов и короче 50'})
  email!: string;

  @ApiProperty({
    title: 'Пароль',
    type: String,
    example:'qwerty12345'
  })
  @IsNotEmpty({message:'Поле не может быть пустым'})
  @Length(8, 50,{message:'Поле должно быть длиннее 8 символов и короче 50'})
  password!: string;
}
