import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRoleDto {
  @ApiProperty({ maxLength: 50 })
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @Type(() => String)
  @IsOptional()
  permissionIds: string[];
}

export class UpdateRoleDto {
  @ApiPropertyOptional({ maxLength: 50 })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  name: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @Type(() => String)
  @IsOptional()
  permissionIds: string[];
}
