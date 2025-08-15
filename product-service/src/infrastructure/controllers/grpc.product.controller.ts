import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductApplicationService } from '../../application/services/product-application.service';

interface GetProductRequest {
  id: string;
}

interface GetProductResponse {
  id: string;
  name: string;
  description?: string;
  price: number;
}

interface ListProductsRequest {
  limit?: number;
  offset?: number;
}

interface ListProductsResponse {
  products: GetProductResponse[];
}

@Controller()
export class GrpcProductController {
  constructor(
    private readonly productApplicationService: ProductApplicationService,
  ) {}

  @GrpcMethod('ProductService', 'GetProductById')
  async getProductById(request: GetProductRequest): Promise<GetProductResponse> {
    const product = await this.productApplicationService.getProduct(request.id);
    
    return {
      id: product.id,
      name: product.name,
      description: product.description || undefined,
      price: product.price,
    };
  }

  @GrpcMethod('ProductService', 'ListProducts')
  async listProducts(request: ListProductsRequest): Promise<ListProductsResponse> {
    const products = await this.productApplicationService.listProducts();
    
    const limitedProducts = request.limit 
      ? products.slice(request.offset || 0, (request.offset || 0) + request.limit)
      : products;

    return {
      products: limitedProducts.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description || undefined,
        price: product.price,
      })),
    };
  }
}
