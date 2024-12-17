import { env, isConfigured } from './config/env';

export const config = {
  github: {
    token: env.github.token,
    owner: env.github.owner,
    isConfigured: isConfigured.github,
  },
  email: {
    serviceId: env.email.serviceId,
    templateId: env.email.templateId,
    userId: env.email.userId,
    isConfigured: isConfigured.email,
  },
};