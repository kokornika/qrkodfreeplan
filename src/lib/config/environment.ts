import { z } from 'zod';

const environmentSchema = z.object({
  github: z.object({
    token: z.string().min(1, 'GitHub token is required'),
    owner: z.string().min(1, 'GitHub owner is required'),
  }),
  email: z.object({
    serviceId: z.string().min(1, 'Email service ID is required'),
    templateId: z.string().min(1, 'Email template ID is required'),
    userId: z.string().min(1, 'Email user ID is required'),
  }),
  stripe: z.object({
    publishableKey: z.string().min(1, 'Stripe publishable key is required'),
    secretKey: z.string().min(1, 'Stripe secret key is required'),
  }),
});

export type Environment = z.infer<typeof environmentSchema>;

export function loadEnvironment(): Environment {
  const env = {
    github: {
      token: import.meta.env.VITE_GITHUB_TOKEN,
      owner: import.meta.env.VITE_GITHUB_OWNER,
    },
    email: {
      serviceId: import.meta.env.VITE_EMAIL_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAIL_TEMPLATE_ID,
      userId: import.meta.env.VITE_EMAIL_USER_ID,
    },
    stripe: {
      publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
      secretKey: import.meta.env.STRIPE_SECRET_KEY,
    },
  };

  try {
    return environmentSchema.parse(env);
  } catch (error) {
    console.error('Environment validation failed:', error);
    throw new Error('Invalid environment configuration');
  }
}