export interface TrialStatus {
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  hasExpired: boolean;
  remainingDays: number;
}

export interface TrialUser {
  email: string;
  name: string;
  customerId: string;
  trialStartDate: Date;
  trialEndDate: Date;
  hasConverted: boolean;
}