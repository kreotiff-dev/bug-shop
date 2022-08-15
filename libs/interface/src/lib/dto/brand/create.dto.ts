import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, } from "class-validator";


export class createBrandDto {
    @ApiProperty({
        description: 'Название бренда',
        type: String
    })
    @IsNotEmpty()
    name!: string;
}