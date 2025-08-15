import { Injectable, Inject } from '@nestjs/common';
import type { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class ListProductsUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }
}
