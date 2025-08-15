import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { Product } from '../../domain/entities/product.entity';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ProductId } from '../../domain/value-objects/product-id.vo';
import { Price } from '../../domain/value-objects/price.vo';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string, dto: UpdateProductDto): Promise<Product> {
    const productId = ProductId.fromString(id);
    const existingProduct = await this.productRepository.findById(productId);
    
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (dto.name !== undefined) {
      existingProduct.name = dto.name;
    }
    
    if (dto.description !== undefined) {
      existingProduct.description = dto.description;
    }
    
    if (dto.price !== undefined) {
      existingProduct.price = Price.fromNumber(dto.price).getValue();
    }

    return await this.productRepository.update(existingProduct);
  }
}
