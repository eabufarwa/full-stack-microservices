import { IsString, IsNumber, IsOptional, Min, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Product name',
    example: 'iPhone 15 Pro Max',
    maxLength: 120,
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @ApiPropertyOptional({
    description: 'Product description',
    example: 'Latest iPhone with advanced features and larger screen',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Product price',
    example: 1199.99,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
