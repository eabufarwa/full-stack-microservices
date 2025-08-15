import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';
import { ProductController } from '../controllers/product.controller';
import { GrpcProductController } from '../controllers/grpc.product.controller';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { GetProductUseCase } from '../../application/use-cases/get-product.use-case';
import { ListProductsUseCase } from '../../application/use-cases/list-products.use-case';
import { UpdateProductUseCase } from '../../application/use-cases/update-product.use-case';
import { DeleteProductUseCase } from '../../application/use-cases/delete-product.use-case';
import { ProductApplicationService } from '../../application/services/product-application.service';
import { ProductDomainService } from '../../domain/services/product-domain.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController, GrpcProductController],
  providers: [
    ProductRepository,
    ProductDomainService,
    CreateProductUseCase,
    GetProductUseCase,
    ListProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    ProductApplicationService,
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
  ],
  exports: [ProductRepository, 'IProductRepository', ProductApplicationService],
})
export class ProductModule {}
