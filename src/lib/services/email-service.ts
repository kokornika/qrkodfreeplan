import emailjs from 'emailjs-com';
import { VCardFormData } from '../../types/vcard';
import { generateOrderSummary } from '../website/order-summary';

export class EmailService {
  private serviceId: string;
  private templateId: string;
  private userId: string;

  constructor() {
    this.serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID || '';
    this.templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID || '';
    this.userId = import.meta.env.VITE_EMAIL_USER_ID || '';
  }

  private validateConfig() {
    if (!this.serviceId || !this.templateId || !this.userId) {
      throw new Error('Email service configuration is missing');
    }
  }

  private async sendEmail(templateId: string, templateParams: any): Promise<void> {
    try {
      this.validateConfig();

      const response = await emailjs.send(
        this.serviceId,
        templateId,
        templateParams,
        this.userId
      );

      if (!response || response.status !== 200) {
        throw new Error(`Email sending failed with status: ${response?.status}`);
      }
    } catch (error) {
      console.error('Email sending error:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to send email');
    }
  }

  async sendCustomerEmail(
    data: VCardFormData,
    plan: { name: string; price: number; period: string },
    deployUrl: string,
    orderId: string
  ): Promise<void> {
    if (!data.email) {
      throw new Error('Customer email is required');
    }

    const templateParams = {
      to_name: data.name,
      to_email: data.email,
      customer_name: data.name,
      plan_name: plan.name,
      plan_price: `${plan.price.toLocaleString()} Ft`,
      plan_period: plan.period,
      order_id: orderId,
      deploy_url: deployUrl
    };

    await this.sendEmail('template_email_ugyfelnek', templateParams);
  }

  async sendAdminEmail(
    data: VCardFormData,
    plan: { name: string; price: number; period: string },
    repoUrl: string,
    deployUrl: string,
    orderId: string,
    paymentIntentId: string
  ): Promise<void> {
    const templateParams = {
      to_name: 'Admin',
      to_email: 'kokornika@gmail.com',
      customer_name: data.name,
      customer_email: data.email,
      customer_phone: data.phoneMobile,
      customer_company: data.company || 'Nincs megadva',
      customer_position: data.position || 'Nincs megadva',
      plan_name: plan.name,
      plan_price: `${plan.price.toLocaleString()} Ft`,
      plan_period: plan.period,
      order_id: orderId,
      payment_intent_id: paymentIntentId,
      repo_url: repoUrl,
      deploy_url: deployUrl,
      order_summary: generateOrderSummary(data)
    };

    await this.sendEmail('template_digital_card_or', templateParams);
  }
}