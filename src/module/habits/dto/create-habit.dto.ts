// create-habit.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateHabitDto {
  @ApiProperty({ description: 'Odat nomi', maxLength: 255 })
  @IsNotEmpty({ message: 'Odat nomini kiriting' })
  @IsString()
  @MaxLength(255)
  name!: string;

  @ApiProperty({ description: 'Foydalanuvchi ID (UUID)' })
  @IsNotEmpty({ message: 'UserId required' })
  @IsUUID()
  userId!: string;

  @ApiPropertyOptional({ description: 'Rang kodi', maxLength: 7, default: '#10B981' })
  @IsOptional()
  @IsString()
  @MaxLength(7)
  color?: string;

  @ApiPropertyOptional({ description: 'Icon nomi', maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  icon?: string;
}

export class UpdateHabitDto {
  @ApiPropertyOptional({ description: 'Odat nomi', maxLength: 255 })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({ description: 'Rang kodi', maxLength: 7 })
  @IsOptional()
  @IsString()
  @MaxLength(7)
  color?: string;

  @ApiPropertyOptional({ description: 'Icon nomi', maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  icon?: string;
}