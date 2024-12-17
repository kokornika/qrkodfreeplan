import { loadStripe } from '@stripe/stripe-js';
import { CustomerData } from '../../types/payment';
import { PaymentPlan } from '../constants/plans';

class StripeService {
  private publishableKey: string;
  private stripePromise: Promise<any>;

  async createCustomer(email: string, name: string): Promise<string> {
    try {
      const response = await fetch('/.netlify/functions/create-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create Stripe customer');
      }

      const data = await response.json();
      return data.customerId;
    } catch (error) {
      console.error('Error creating Stripe customer:', error);
      throw error;
    }
  }

  constructor() {
    this.publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
    this.stripePromise = this.initializeStripe();
  }

  private initializeStripe() {
    if (!this.publishableKey) {
      console.error('Stripe publishable key is not configured');
      return Promise.resolve(null);
    }
    return loadStripe(this.publishableKey);
  }

  async createPaymentSession(customerData: CustomerData, plan: PaymentPlan) {
    try {
      const stripe = await this.stripePromise;
      if (!stripe) {
        throw new Error('Stripe is not configured');
      }

      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          customerData,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create payment session');
      }

      const session = await response.json();
      
      if (!session.id) {
        throw new Error('Invalid session response');
      }

      // Redirect to checkout using Stripe's redirectToCheckout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return session;
    } catch (error) {
      console.error('Payment session creation error:', error);
      throw error;
    }
  }

  async getSession(sessionId: string) {
    try {
      const response = await fetch(`/.netlify/functions/get-session?session_id=${sessionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to retrieve session');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error retrieving session:', error);
      throw error;
    }
  }
}

export const stripeService = new StripeService();