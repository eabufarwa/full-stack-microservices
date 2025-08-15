import { Injectable, Inject } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import type { IProductService, ProductInfo } from '../../domain/services/product-service.interface';

interface ProductGrpcService {
  GetProductById(data: { id: string }): Promise<ProductInfo>;
}

@Injectable()
export class ProductService implements IProductService {
  private productService: ProductGrpcService;

  constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.productService = this.client.getService<ProductGrpcService>('ProductService');
  }

  async getProductById(id: string): Promise<ProductInfo> {
    return await this.productService.GetProductById({ id });
  }
}
