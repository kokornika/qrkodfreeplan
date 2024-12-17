export class OrderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OrderError';
  }
}

export class ValidationError extends OrderError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class PaymentError extends OrderError {
  constructor(message: string) {
    super(message);
    this.name = 'PaymentError';
  }
}