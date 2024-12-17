import { z } from 'zod';

const envSchema = z.object({
  github: z.object({
    token: z.string().optional().default(''),
    owner: z.string().optional().default(''),
  }),
  email: z.object({
    serviceId: z.string().optional().default(''),
    templateId: z.string().optional().default(''),
    userId: z.string().optional().default(''),
  }),
  stripe: z.object({
    publishableKey: z.string().optional().default(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ''),
  }),
});

const parseEnv = () => {
  try {
    const env = {
      github: {
        token: import.meta.env.VITE_GITHUB_TOKEN || '',
        owner: import.meta.env.VITE_GITHUB_OWNER || '',
      },
      email: {
        serviceId: import.meta.env.VITE_EMAIL_SERVICE_ID || '',
        templateId: import.meta.env.VITE_EMAIL_TEMPLATE_ID || '',
        userId: import.meta.env.VITE_EMAIL_USER_ID || '',
      },
      stripe: {
        publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
      },
    };

    return envSchema.parse(env);
  } catch (error) {
    console.warn('Environment validation failed:', error);
    return envSchema.parse({
      github: { token: '', owner: '' },
      email: { serviceId: '', templateId: '', userId: '' },
      stripe: { publishableKey: '' },
    });
  }
};

export const env = parseEnv();

export const isConfigured = {
  github: () => Boolean(env.github.token && env.github.owner),
  email: () => Boolean(env.email.serviceId && env.email.templateId && env.email.userId),
  stripe: () => Boolean(env.stripe.publishableKey),
};