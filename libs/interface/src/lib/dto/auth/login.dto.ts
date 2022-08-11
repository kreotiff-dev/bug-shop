import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Length(5, 50)
  email!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(8, 50)
  password!: string;
}
