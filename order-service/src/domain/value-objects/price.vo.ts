import { IsNumber, Min } from 'class-validator';

export class Price {
  @IsNumber()
  @Min(0)
  private readonly value: number;

  constructor(value: number) {
    if (value < 0) {
      throw new Error('Price must be non-negative');
    }
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }

  add(other: Price): Price {
    return new Price(this.value + other.value);
  }

  subtract(other: Price): Price {
    const result = this.value - other.value;
    if (result < 0) {
      throw new Error('Price cannot be negative');
    }
    return new Price(result);
  }

  multiply(factor: number): Price {
    if (factor < 0) {
      throw new Error('Multiplication factor must be non-negative');
    }
    return new Price(this.value * factor);
  }

  equals(other: Price): boolean {
    return this.value === other.value;
  }

  isGreaterThan(other: Price): boolean {
    return this.value > other.value;
  }

  isLessThan(other: Price): boolean {
    return this.value < other.value;
  }

  toString(): string {
    return this.value.toFixed(2);
  }

  static fromNumber(value: number): Price {
    return new Price(value);
  }

  static zero(): Price {
    return new Price(0);
  }
}
