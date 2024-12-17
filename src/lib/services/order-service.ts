import { VCardFormData } from '../../types/vcard';
import { PaymentPlan } from '../constants/plans';
import { stripeService } from './stripe-service';
import { EmailService } from './email-service';
import { GitHubRepository } from './github-service';
import { OrderError } from '../errors/order-errors';

export class OrderService {
  private emailService: EmailService;
  private githubRepo: GitHubRepository;

  constructor() {
    this.emailService = new EmailService();
    this.githubRepo = new GitHubRepository();
  }

  async completeOrder(sessionId: string, orderId: string): Promise<void> {
    try {
      // Get session details from Stripe to get payment intent
      const sessionData = await stripeService.getSession(sessionId);
      const paymentIntentId = sessionData.payment_intent?.id;
      
      if (!paymentIntentId) {
        throw new Error('Payment intent ID not found');
      }

      // Retrieve stored order data
      const orderDataStr = sessionStorage.getItem('orderData');
      if (!orderDataStr) {
        throw new Error('Order data not found');
      }

      const { formData, plan } = JSON.parse(orderDataStr);

      // Create GitHub repository and get URLs
      const { repoUrl, deployUrl } = await this.githubRepo.createRepository(formData, orderId);

      // Wait for a moment to allow Netlify to start the deployment
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Send confirmation emails
      await Promise.all([
        this.emailService.sendCustomerEmail(formData, plan, deployUrl, orderId),
        this.emailService.sendAdminEmail(formData, plan, repoUrl, deployUrl, orderId, paymentIntentId)
      ]);

      // Clear session storage
      sessionStorage.removeItem('orderData');
    } catch (error) {
      console.error('Order completion error:', error);
      throw new OrderError(
        error instanceof Error ? error.message : 'Failed to complete order'
      );
    }
  }
}

// Create and export a singleton instance
export const orderService = new OrderService();