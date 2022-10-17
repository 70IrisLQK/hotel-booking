import { IsString, MaxLength, IsArray, IsOptional } from 'class-validator';

export class CreateRoomDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  description: string;

  @IsOptional()
  @IsString()
  quantity: number;

  @IsOptional()
  @IsString()
  price: number;

  @IsOptional()
  @IsArray()
  images: string[];

  @IsOptional()
  @IsArray()
  publicIds: string[];
}

export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  description: string;

  @IsOptional()
  @IsString()
  quantity: number;

  @IsOptional()
  @IsString()
  price: number;

  @IsOptional()
  images: string[];

  @IsOptional()
  @IsArray()
  publicIds: string[];
}
