import { Injectable } from '@nestjs/common';
import { Price } from '../value-objects/price.vo';

@Injectable()
export class ProductDomainService {
  calculateDiscountedPrice(originalPrice: Price, discountPercentage: number): Price {
    if (discountPercentage < 0 || discountPercentage > 100) {
      throw new Error('Discount percentage must be between 0 and 100');
    }
    
    const discountMultiplier = (100 - discountPercentage) / 100;
    const discountedAmount = originalPrice.getValue() * discountMultiplier;
    
    return Price.fromNumber(discountedAmount);
  }

  validateProductName(name: string): boolean {
    return Boolean(name && name.trim().length >= 1 && name.trim().length <= 120);
  }

  validateProductPrice(price: number): boolean {
    return price >= 0;
  }

  generateProductSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
