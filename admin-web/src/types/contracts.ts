import type { components } from 'contracts/gen/openapi/product.types';
import type { components as OrderComponents } from 'contracts/gen/openapi/order.types';

export type Product = components['schemas']['Product'];
export type CreateProductRequest = components['schemas']['CreateProductRequest'];
export type UpdateProductRequest = components['schemas']['UpdateProductRequest'];

export type Order = OrderComponents['schemas']['Order'];
export type CreateOrderRequest = OrderComponents['schemas']['CreateOrderRequest'];

export type ErrorResponse = components['schemas']['ErrorResponse'];
