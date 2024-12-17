import { TrialStatus, TrialUser } from '../../types/trial';
import { PAYMENT_PLANS } from '../constants/plans';
import { emailService } from '../services/email-service';
import { stripeService } from './stripe-service';

export class TrialService {
  private static TRIAL_KEY = 'trial_status';

  static async startTrial(email: string, name: string): Promise<TrialStatus> {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + PAYMENT_PLANS[0].trialDays);

    // Create Stripe customer
    let customerId;
    try {
      customerId = await stripeService.createCustomer(email, name);
    } catch (error) {
      console.error('Failed to create Stripe customer:', error);
      throw new Error('Failed to start trial');
    }
    const trialUser: TrialUser = {
      email,
      name,
      customerId,
      trialStartDate: startDate,
      trialEndDate: endDate,
      hasConverted: false
    };

    // Store trial info
    localStorage.setItem(this.TRIAL_KEY, JSON.stringify(trialUser));

    // Send welcome email
    try {
      await emailService.sendTrialWelcomeEmail(email, name);
    } catch (error) {
      console.error('Failed to send welcome email:', error);
    }

    return this.getTrialStatus();
  }

  static getTrialStatus(): TrialStatus {
    const trialData = localStorage.getItem(this.TRIAL_KEY);
    
    if (!trialData) {
      return {
        isActive: false,
        startDate: new Date(),
        endDate: new Date(),
        hasExpired: true,
        remainingDays: 0
      };
    }

    const trial: TrialUser = JSON.parse(trialData);
    const now = new Date();
    const endDate = new Date(trial.trialEndDate);
    const remainingTime = endDate.getTime() - now.getTime();
    const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

    return {
      isActive: remainingDays > 0 && !trial.hasConverted,
      startDate: new Date(trial.trialStartDate),
      endDate: endDate,
      hasExpired: remainingDays <= 0,
      remainingDays: Math.max(0, remainingDays)
    };
  }

  static async convertTrialUser(): Promise<void> {
    const trialData = localStorage.getItem(this.TRIAL_KEY);
    if (trialData) {
      const trial: TrialUser = JSON.parse(trialData);
      trial.hasConverted = true;
      localStorage.setItem(this.TRIAL_KEY, JSON.stringify(trial));

      // Send conversion confirmation email
      try {
        await emailService.sendTrialConversionEmail(trial.email, trial.name);
      } catch (error) {
        console.error('Failed to send conversion email:', error);
      }
    }
  }

  static async sendTrialEndingReminder(email: string, name: string, daysLeft: number): Promise<void> {
    try {
      await emailService.sendTrialEndingEmail(email, name, daysLeft);
    } catch (error) {
      console.error('Failed to send trial ending reminder:', error);
    }
  }
}