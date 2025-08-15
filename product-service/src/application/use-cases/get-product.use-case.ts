import { Injectable, Inject } from '@nestjs/common';
import type { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { Product } from '../../domain/entities/product.entity';
import { ProductId } from '../../domain/value-objects/product-id.vo';
import { ProductNotFoundException } from '../../domain/exceptions/product-domain.exception';

@Injectable()
export class GetProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string): Promise<Product> {
    const productId = ProductId.fromString(id);
    const product = await this.productRepository.findById(productId);
    
    if (!product) {
      throw new ProductNotFoundException(id);
    }
    
    return product;
  }
}
