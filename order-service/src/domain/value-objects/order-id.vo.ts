import { IsUUID } from 'class-validator';

export class OrderId {
  @IsUUID()
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: OrderId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }

  static create(): OrderId {
    return new OrderId(crypto.randomUUID());
  }

  static fromString(value: string): OrderId {
    return new OrderId(value);
  }
}
