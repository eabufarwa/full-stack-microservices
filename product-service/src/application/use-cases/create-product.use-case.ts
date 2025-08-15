import { Injectable, Inject } from '@nestjs/common';
import type { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { Product } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductId } from '../../domain/value-objects/product-id.vo';
import { Price } from '../../domain/value-objects/price.vo';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(dto: CreateProductDto): Promise<Product> {
    const product = new Product();
    product.id = ProductId.create().getValue();
    product.name = dto.name;
    product.description = dto.description;
    product.price = Price.fromNumber(dto.price).getValue();

    return await this.productRepository.save(product);
  }
}
