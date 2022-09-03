import { Sex } from '@prisma/client';

export class updateUserDto {
  email?: string;
  name?: string;
  surname?: string;
  phone?: string;
  bithday?: number;
  sex?: Sex;
}
