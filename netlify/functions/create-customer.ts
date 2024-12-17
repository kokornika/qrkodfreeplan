import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email, name } = JSON.parse(event.body || '');

    if (!email || !name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Invalid request',
          message: 'Email and name are required'
        })
      };
    }

    // Create a new customer in Stripe
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        trialStartDate: new Date().toISOString(),
        trialEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        customerId: customer.id
      })
    };
  } catch (error) {
    console.error('Error creating customer:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to create customer',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};