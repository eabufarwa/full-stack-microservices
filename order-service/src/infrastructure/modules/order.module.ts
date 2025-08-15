import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Order } from '../../domain/entities/order.entity';
import { OrderRepository } from '../repositories/order.repository';
import { ProductService } from '../services/product.service';
import { OrderController } from '../controllers/order.controller';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';
import { GetOrderUseCase } from '../../application/use-cases/get-order.use-case';
import { ListOrdersUseCase } from '../../application/use-cases/list-orders.use-case';
import { OrderApplicationService } from '../../application/services/order-application.service';
import { OrderDomainService } from '../../domain/services/order-domain.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ClientsModule.register([
      {
        name: 'PRODUCT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'product.v1',
          protoPath: join(__dirname, '../../../proto/product.proto'),
          url: process.env.PRODUCT_GRPC_ADDR || 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [
    OrderRepository,
    ProductService,
    OrderDomainService,
    CreateOrderUseCase,
    GetOrderUseCase,
    ListOrdersUseCase,
    OrderApplicationService,
    {
      provide: 'IOrderRepository',
      useClass: OrderRepository,
    },
    {
      provide: 'IProductService',
      useClass: ProductService,
    },
  ],
  exports: [OrderRepository, 'IOrderRepository', OrderApplicationService],
})
export class OrderModule {}
