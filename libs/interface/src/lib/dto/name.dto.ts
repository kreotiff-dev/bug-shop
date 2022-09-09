import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class nameDto{
    @ApiProperty({
        name:'name',
        example:'xiaomi',
        required: true,
    })
    @IsNotEmpty({message:'Поле name не может быть пустым'})
    name!:string;
}