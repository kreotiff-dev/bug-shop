import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class createTypeDto {
    @ApiProperty({
        description: 'Название категории',
        type: String
    })
    @IsNotEmpty()
    @IsString()
    name!: string;
}