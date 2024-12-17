import { EmailService } from './email-service';
import { GitHubRepository } from './github-service';
import { OrderService } from './order-service';

export const services = {
  email: new EmailService(),
  github: new GitHubRepository(),
  order: new OrderService()
};

export { EmailService } from './email-service';
export { GitHubRepository } from './github-service';
export { OrderService } from './order-service';