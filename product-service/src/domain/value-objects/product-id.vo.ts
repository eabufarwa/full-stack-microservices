import { IsUUID } from 'class-validator';

export class ProductId {
  @IsUUID()
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ProductId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }

  static create(): ProductId {
    return new ProductId(crypto.randomUUID());
  }

  static fromString(value: string): ProductId {
    return new ProductId(value);
  }
}
