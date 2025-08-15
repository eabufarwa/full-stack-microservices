import { Product } from '../entities/product.entity';
import { ProductId } from '../value-objects/product-id.vo';
import { ProductFilters, ProductSearchCriteria } from '../types/product.types';

export interface IProductRepository {
  findById(id: ProductId): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  save(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  delete(id: ProductId): Promise<void>;
  findByName(name: string): Promise<Product[]>;
  findByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]>;
  findByFilters(filters: ProductFilters): Promise<Product[]>;
  search(criteria: ProductSearchCriteria): Promise<Product[]>;
  exists(id: ProductId): Promise<boolean>;
}
