import emailjs from 'emailjs-com';
import { VCardFormData } from '../../types/vcard';

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

  async sendTrialWelcomeEmail(email: string, name: string): Promise<void> {
    const templateParams = {
      to_name: name,
      to_email: email,
      trial_days: 14,
      trial_end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('hu-HU')
    };

    await this.sendEmail('template_trial_welcome', templateParams);
  }

  async sendTrialEndingEmail(email: string, name: string, daysLeft: number): Promise<void> {
    const templateParams = {
      to_name: name,
      to_email: email,
      days_left: daysLeft,
      trial_end_date: new Date(Date.now() + daysLeft * 24 * 60 * 60 * 1000).toLocaleDateString('hu-HU')
    };

    await this.sendEmail('template_trial_ending', templateParams);
  }

  async sendTrialConversionEmail(email: string, name: string): Promise<void> {
    const templateParams = {
      to_name: name,
      to_email: email
    };

    await this.sendEmail('template_trial_conversion', templateParams);
  }
}

// Export a singleton instance
export const emailService = new EmailService();