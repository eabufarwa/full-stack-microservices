import { Injectable } from '@nestjs/common';
import { CreateProductUseCase } from '../use-cases/create-product.use-case';
import { GetProductUseCase } from '../use-cases/get-product.use-case';
import { ListProductsUseCase } from '../use-cases/list-products.use-case';
import { UpdateProductUseCase } from '../use-cases/update-product.use-case';
import { DeleteProductUseCase } from '../use-cases/delete-product.use-case';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class ProductApplicationService {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  async createProduct(dto: CreateProductDto): Promise<Product> {
    return await this.createProductUseCase.execute(dto);
  }

  async getProduct(id: string): Promise<Product> {
    return await this.getProductUseCase.execute(id);
  }

  async listProducts(): Promise<Product[]> {
    return await this.listProductsUseCase.execute();
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
    return await this.updateProductUseCase.execute(id, dto);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.deleteProductUseCase.execute(id);
  }
}
