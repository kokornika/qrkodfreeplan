import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const sessionId = event.queryStringParameters?.session_id;

  if (!sessionId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing session_id parameter' })
    };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent']
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        payment_intent: typeof session.payment_intent === 'string' 
          ? { id: session.payment_intent }
          : session.payment_intent
      })
    };
  } catch (error) {
    console.error('Error retrieving session:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve session' })
    };
  }
};