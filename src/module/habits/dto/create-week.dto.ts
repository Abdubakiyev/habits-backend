// create-week.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsDateString } from 'class-validator';

export class CreateWeekDto {
  @ApiProperty({ description: 'Hafta raqami' })
  @IsNotEmpty({ message: 'Hafta raqamini kiriting' })
  @IsInt()
  weekNumber?: number;

  @ApiProperty({ description: 'Boshlanish sanasi (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'Boshlanish sanasini kiriting' })
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: 'Tugash sanasi (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'Tugash sanasini kiriting' })
  @IsDateString()
  endDate?: string;
}