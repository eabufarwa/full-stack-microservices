export interface ProductInfo {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface IProductService {
  getProductById(id: string): Promise<ProductInfo>;
}
