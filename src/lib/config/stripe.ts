import { env, isConfigured } from './env';

export const stripeConfig = {
  publishableKey: env.stripe.publishableKey,
  isConfigured: isConfigured.stripe,
};