import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ProductApplicationService } from '../../application/services/product-application.service';
import { CreateProductDto } from '../../application/dtos/create-product.dto';
import { UpdateProductDto } from '../../application/dtos/update-product.dto';
import { Product } from '../../domain/entities/product.entity';

@ApiTags('Products')
@Controller('api/v1/products')
export class ProductController {
  constructor(
    private readonly productApplicationService: ProductApplicationService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productApplicationService.createProduct(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'List of products',
    type: [Product],
  })
  async findAll(): Promise<Product[]> {
    return await this.productApplicationService.listProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'Product found',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productApplicationService.getProduct(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productApplicationService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 204, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.productApplicationService.deleteProduct(id);
  }
}
