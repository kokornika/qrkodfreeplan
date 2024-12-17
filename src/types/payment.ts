export interface CustomerData {
  name: string;
  email: string;
  company?: string;
}

export interface PaymentSession {
  id: string;
  url: string;
}