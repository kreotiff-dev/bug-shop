import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";


export class idDeviceDto {
    @ApiProperty({
        title: 'id устройства',
        example: 1,
        required: true,
        type: Number
    })
    @IsNotEmpty({message:'Id не может быть пустым значением'})
    @IsInt({message:'Id должен быть числом'})
    idDevice!: number 
}