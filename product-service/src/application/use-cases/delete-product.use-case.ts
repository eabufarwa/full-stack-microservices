import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { ProductId } from '../../domain/value-objects/product-id.vo';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const productId = ProductId.fromString(id);
    const exists = await this.productRepository.exists(productId);
    
    if (!exists) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    await this.productRepository.delete(productId);
  }
}
