import { IsNumber, Min } from 'class-validator';
import { OrderQuantityInvalidException } from '../exceptions/order-domain.exception';

export class Quantity {
  @IsNumber()
  @Min(1)
  private readonly value: number;

  constructor(value: number) {
    if (value < 1) {
      throw new OrderQuantityInvalidException('Quantity must be at least 1');
    }
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }

  add(other: Quantity): Quantity {
    return new Quantity(this.value + other.value);
  }

  subtract(other: Quantity): Quantity {
    const result = this.value - other.value;
    if (result < 1) {
      throw new OrderQuantityInvalidException('Quantity cannot be less than 1');
    }
    return new Quantity(result);
  }

  multiply(factor: number): Quantity {
    if (factor < 1) {
      throw new OrderQuantityInvalidException('Multiplication factor must be at least 1');
    }
    return new Quantity(this.value * factor);
  }

  equals(other: Quantity): boolean {
    return this.value === other.value;
  }

  isGreaterThan(other: Quantity): boolean {
    return this.value > other.value;
  }

  isLessThan(other: Quantity): boolean {
    return this.value < other.value;
  }

  toString(): string {
    return this.value.toString();
  }

  static fromNumber(value: number): Quantity {
    return new Quantity(value);
  }

  static one(): Quantity {
    return new Quantity(1);
  }
}
