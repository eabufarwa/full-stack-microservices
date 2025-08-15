import { IsString, IsNumber, IsOptional, Min, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'iPhone 15 Pro',
    maxLength: 120,
  })
  @IsString()
  @MaxLength(120)
  name: string;

  @ApiPropertyOptional({
    description: 'Product description',
    example: 'Latest iPhone with advanced features',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Product price',
    example: 999.99,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  price: number;
}
