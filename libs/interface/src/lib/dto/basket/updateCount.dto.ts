import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";


export class updateCountDto {
    @ApiProperty({
        description:'Id устройства, в котором хотим изменить кол-во штук в корзине',
        type: Number,
        example: 1
    })
    @IsNotEmpty({message:'Id не может быть пустым значением'})
    @IsInt({message:'Id должен быть числом'})
    idDevice!: number 

    @ApiProperty({
        description:'Желаемое кол-во штук данного устройства',
        type: Number,
        example: 2
    })
    @IsNotEmpty({message:'Кол-во штук не может быть пустым значением'})
    @IsInt({message:'Кол-во должно быть числом'})
    count!: number; 
    
}