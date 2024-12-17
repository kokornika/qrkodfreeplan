import { VCardFormData } from '../types/vcard';
import emailjs from 'emailjs-com';
import { generateOrderSummary } from './website/order-summary';
import { GitHubRepository } from './github';

export class WebsiteGenerator {
  private github: GitHubRepository;

  constructor() {
    this.github = new GitHubRepository();
  }

  async sendWebsiteCode(
    data: VCardFormData, 
    plan?: { name: string; price: number; period: string },
    orderId?: string,
    sessionId?: string
  ): Promise<void> {
    try {
      if (!data.email) {
        throw new Error('Email address is required');
      }

      if (!data.name) {
        throw new Error('Name is required');
      }

      // Create GitHub repository and deploy to Netlify
      const { repoUrl, deployUrl } = await this.github.createRepository(data, orderId);
      
      // Send email to customer
      await this.sendCustomerEmail(data, plan, deployUrl, orderId);
      
      // Send email to admin
      await this.sendAdminEmail(data, plan, repoUrl, deployUrl, orderId, sessionId);
    } catch (error) {
      console.error('Error processing order:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to process order');
    }
  }

  private async sendCustomerEmail(
    data: VCardFormData,
    plan?: { name: string; price: number; period: string },
    deployUrl?: string,
    orderId?: string
  ): Promise<void> {
    const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAIL_USER_ID;

    if (!serviceId || !templateId || !userId) {
      console.warn('Email service not configured');
      return;
    }

    try {
      const templateParams = {
        to_name: data.name,
        to_email: data.email,
        customer_name: data.name,
        plan_name: plan?.name || 'Alap csomag',
        plan_price: plan?.price ? `${plan.price.toLocaleString()} Ft` : '500 Ft',
        plan_period: plan?.period || '3 hónap',
        order_id: orderId || 'N/A',
        deploy_url: deployUrl || 'Nem sikerült deployolni'
      };

      const response = await emailjs.send(
        serviceId,
        'template_email_ugyfelnek',
        templateParams,
        userId
      );

      if (!response || response.status !== 200) {
        throw new Error('Failed to send customer email');
      }
    } catch (error) {
      console.error('Error sending customer email:', error);
      throw error;
    }
  }

  private async sendAdminEmail(
    data: VCardFormData,
    plan?: { name: string; price: number; period: string },
    repoUrl?: string,
    deployUrl?: string,
    orderId?: string,
    sessionId?: string
  ): Promise<void> {
    const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAIL_USER_ID;

    if (!serviceId || !templateId || !userId) {
      console.warn('Email service not configured');
      return;
    }

    try {
      const templateParams = {
        to_name: 'Admin',
        to_email: 'kokornika@gmail.com',
        customer_name: data.name,
        customer_email: data.email,
        customer_phone: data.phoneMobile,
        customer_company: data.company,
        customer_position: data.position,
        plan_name: plan?.name || 'Alap csomag',
        plan_price: plan?.price ? `${plan.price.toLocaleString()} Ft` : '500 Ft',
        plan_period: plan?.period || '3 hónap',
        order_id: orderId || 'N/A',
        stripe_session_id: sessionId || 'N/A',
        repo_url: repoUrl || 'Nem sikerült létrehozni',
        deploy_url: deployUrl || 'Nem sikerült deployolni',
        order_summary: generateOrderSummary(data)
      };

      const response = await emailjs.send(
        serviceId,
        'template_digital_card_or',
        templateParams,
        userId
      );

      if (!response || response.status !== 200) {
        throw new Error('Failed to send admin email');
      }
    } catch (error) {
      console.error('Error sending admin email:', error);
      throw error;
    }
  }
}