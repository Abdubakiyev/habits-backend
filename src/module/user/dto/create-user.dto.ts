import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: "Foydalanuvchi ismi", example: "Abdulloh" })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: "Foydalanuvchi telefon raqami", example: "+998901234567" })
  @IsString()
  @IsNotEmpty()
  phone!: string;
}