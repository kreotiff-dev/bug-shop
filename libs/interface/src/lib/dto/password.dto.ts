import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class passwordDto {
    @ApiProperty({
        title: 'Пароль',
        example: 'qwerty12345',
        required: true,
        type: String
    })
    @IsNotEmpty({message:'Поле не может быть пустым'})
    password!: string 
}