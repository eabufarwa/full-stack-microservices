export class OrderDomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OrderDomainException';
  }
}

export class OrderQuantityInvalidException extends OrderDomainException {
  constructor(message: string = 'Order quantity is invalid') {
    super(message);
    this.name = 'OrderQuantityInvalidException';
  }
}

export class OrderStatusInvalidException extends OrderDomainException {
  constructor(message: string = 'Order status is invalid') {
    super(message);
    this.name = 'OrderStatusInvalidException';
  }
}

export class OrderNotFoundException extends OrderDomainException {
  constructor(orderId: string) {
    super(`Order with ID ${orderId} not found`);
    this.name = 'OrderNotFoundException';
  }
}

export class ProductNotFoundForOrderException extends OrderDomainException {
  constructor(productId: string) {
    super(`Product with ID ${productId} not found for order creation`);
    this.name = 'ProductNotFoundForOrderException';
  }
}

export class OrderCannotBeCancelledException extends OrderDomainException {
  constructor(orderId: string, status: string) {
    super(`Order with ID ${orderId} cannot be cancelled in status ${status}`);
    this.name = 'OrderCannotBeCancelledException';
  }
}

export class OrderCannotBeUpdatedException extends OrderDomainException {
  constructor(orderId: string, status: string) {
    super(`Order with ID ${orderId} cannot be updated in status ${status}`);
    this.name = 'OrderCannotBeUpdatedException';
  }
}
