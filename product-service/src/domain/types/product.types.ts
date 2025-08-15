export interface ProductSnapshot {
  id: string;
  name: string;
  description?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilters {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  offset?: number;
}

export interface ProductSearchCriteria {
  name?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  createdAfter?: Date;
  createdBefore?: Date;
}
