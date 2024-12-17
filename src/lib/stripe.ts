import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  
  if (!publishableKey) {
    console.error('Stripe publishable key is not configured');
    return Promise.resolve(null);
  }

  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

interface CustomerData {
  name: string;
  email: string;
  company?: string;
}

export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  comparisonPoints: string[];
}

export async function createPaymentSession(customerData: CustomerData, plan: PaymentPlan) {
  try {
    const stripe = await getStripe();
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
      throw new Error(error.message || 'A fizetési munkamenet létrehozása sikertelen');
    }

    const session = await response.json();

    if (session.error) {
      throw new Error(session.error);
    }

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Payment session creation failed:', error);
    throw error;
  }
}