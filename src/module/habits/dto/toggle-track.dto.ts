// toggle-track.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsDateString, IsBoolean, IsOptional, IsString } from 'class-validator';

export class ToggleTrackDto {
  @ApiProperty({ description: 'Odat ID (UUID)' })
  @IsNotEmpty()
  @IsUUID()
  habitId?: string;

  @ApiProperty({ description: 'Hafta ID (UUID)' })
  @IsNotEmpty()
  @IsUUID()
  weekId?: string;

  @ApiProperty({ description: 'Kuni (YYYY-MM-DD)' })
  @IsNotEmpty()
  @IsDateString()
  trackDate?: string;

  @ApiProperty({ description: 'Odat bajarilganmi', default: false })
  @IsNotEmpty()
  @IsBoolean()
  isCompleted?: boolean;

  @ApiPropertyOptional({ description: 'Qo\'shimcha izoh' })
  @IsOptional()
  @IsString()
  notes?: string;
}