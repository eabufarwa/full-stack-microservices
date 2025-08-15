export class ProductDomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProductDomainException';
  }
}

export class ProductNameInvalidException extends ProductDomainException {
  constructor(message: string = 'Product name is invalid') {
    super(message);
    this.name = 'ProductNameInvalidException';
  }
}

export class ProductPriceInvalidException extends ProductDomainException {
  constructor(message: string = 'Product price is invalid') {
    super(message);
    this.name = 'ProductPriceInvalidException';
  }
}

export class ProductNotFoundException extends ProductDomainException {
  constructor(productId: string) {
    super(`Product with ID ${productId} not found`);
    this.name = 'ProductNotFoundException';
  }
}

export class ProductAlreadyExistsException extends ProductDomainException {
  constructor(productName: string) {
    super(`Product with name ${productName} already exists`);
    this.name = 'ProductAlreadyExistsException';
  }
}
