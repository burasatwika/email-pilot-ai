export interface Email {
  id: string;
  sender: string;
  subject: string;
  body: string;
  sentDate: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  priority: 'urgent' | 'normal';
  status: 'pending' | 'responded' | 'resolved';
  category: string;
  extractedInfo: {
    contactDetails?: string[];
    requirements?: string[];
    customerType?: string;
    productMentioned?: string[];
  };
}

export interface DashboardStats {
  totalEmails: number;
  emailsToday: number;
  resolved: number;
  pending: number;
  urgent: number;
  sentimentBreakdown: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export interface AIResponse {
  emailId: string;
  generatedResponse: string;
  confidence: number;
  suggestedTone: string;
  keyPoints: string[];
}