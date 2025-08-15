import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { Product } from '../../domain/entities/product.entity';
import { ProductId } from '../../domain/value-objects/product-id.vo';
import { ProductFilters, ProductSearchCriteria } from '../../domain/types/product.types';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async findById(id: ProductId): Promise<Product | null> {
    return await this.repository.findOne({
      where: { id: id.getValue() },
    });
  }

  async findAll(): Promise<Product[]> {
    return await this.repository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async save(product: Product): Promise<Product> {
    return await this.repository.save(product);
  }

  async update(product: Product): Promise<Product> {
    return await this.repository.save(product);
  }

  async delete(id: ProductId): Promise<void> {
    await this.repository.delete(id.getValue());
  }

  async findByName(name: string): Promise<Product[]> {
    return await this.repository.find({
      where: { name },
      order: { createdAt: 'DESC' },
    });
  }

  async findByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]> {
    return await this.repository
      .createQueryBuilder('product')
      .where('product.price >= :minPrice', { minPrice })
      .andWhere('product.price <= :maxPrice', { maxPrice })
      .orderBy('product.createdAt', 'DESC')
      .getMany();
  }

  async findByFilters(filters: ProductFilters): Promise<Product[]> {
    const queryBuilder = this.repository.createQueryBuilder('product');
    
    if (filters.name) {
      queryBuilder.andWhere('product.name LIKE :name', { name: `%${filters.name}%` });
    }
    
    if (filters.minPrice) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice: filters.minPrice });
    }
    
    if (filters.maxPrice) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice: filters.maxPrice });
    }
    
    queryBuilder.orderBy('product.createdAt', 'DESC');
    
    if (filters.limit) {
      queryBuilder.limit(filters.limit);
    }
    
    if (filters.offset) {
      queryBuilder.offset(filters.offset);
    }
    
    return await queryBuilder.getMany();
  }

  async search(criteria: ProductSearchCriteria): Promise<Product[]> {
    const queryBuilder = this.repository.createQueryBuilder('product');
    
    if (criteria.name) {
      queryBuilder.andWhere('product.name LIKE :name', { name: `%${criteria.name}%` });
    }
    
    if (criteria.priceRange) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice: criteria.priceRange.min });
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice: criteria.priceRange.max });
    }
    
    if (criteria.createdAfter) {
      queryBuilder.andWhere('product.createdAt >= :createdAfter', { createdAfter: criteria.createdAfter });
    }
    
    if (criteria.createdBefore) {
      queryBuilder.andWhere('product.createdAt <= :createdBefore', { createdBefore: criteria.createdBefore });
    }
    
    queryBuilder.orderBy('product.createdAt', 'DESC');
    
    return await queryBuilder.getMany();
  }

  async exists(id: ProductId): Promise<boolean> {
    const count = await this.repository.count({
      where: { id: id.getValue() },
    });
    return count > 0;
  }
}
