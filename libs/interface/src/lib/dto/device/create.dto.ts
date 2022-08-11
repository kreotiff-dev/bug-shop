// import { IsNotEmpty } from "class-validator";
export class CreateDeviceDto {
  // @IsNotEmpty
  name!: string;
  price!: number;
  img!: string;
  typeId!: number;
  brandId!: number;
}
