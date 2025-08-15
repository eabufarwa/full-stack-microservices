import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { OrderApplicationService } from '../../application/services/order-application.service';
import { CreateOrderDto } from '../../application/dtos/create-order.dto';
import { Order } from '../../domain/entities/order.entity';

@ApiTags('Orders')
@Controller('api/v1/orders')
export class OrderController {
  constructor(
    private readonly orderApplicationService: OrderApplicationService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
    type: Order,
  })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid product ID' })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.orderApplicationService.createOrder(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: 200,
    description: 'List of orders',
    type: [Order],
  })
  async findAll(): Promise<Order[]> {
    return await this.orderApplicationService.listOrders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({
    status: 200,
    description: 'Order found',
    type: Order,
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async findOne(@Param('id') id: string): Promise<Order> {
    return await this.orderApplicationService.getOrder(id);
  }
}
