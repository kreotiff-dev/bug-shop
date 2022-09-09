import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class resetPassword{
    @ApiProperty({
        title: 'Новый пароль',
        example: 'qwerty54321',
        required: true,
        type: String
    })
    @IsNotEmpty({message:'Поле не может быть пустым'})
    newPassword!: string 

    
    @ApiProperty({
        title: 'Старый пароль',
        example: 'qwerty12345',
        required: true,
        type: String
    })
    @IsNotEmpty({message:'Поле не может быть пустым'})
    oldPassword!: string 
}