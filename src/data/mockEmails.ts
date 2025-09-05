import { Email, DashboardStats } from '@/types/email';

export const mockEmails: Email[] = [
  {
    id: '1',
    sender: 'eve@startup.io',
    subject: 'Help required with account verification',
    body: 'Do you support integration with third-party APIs? Specifically, I\'m looking for CRM integration options. I need this urgently as our client presentation is tomorrow.',
    sentDate: '2025-01-09T10:30:00Z',
    sentiment: 'neutral',
    priority: 'urgent',
    status: 'pending',
    category: 'Integration Support',
    extractedInfo: {
      contactDetails: ['eve@startup.io'],
      requirements: ['CRM integration', 'Third-party API support'],
      customerType: 'Business',
      productMentioned: ['API', 'CRM']
    }
  },
  {
    id: '2',
    sender: 'john.doe@company.com',
    subject: 'Query about billing discrepancy',
    body: 'I noticed an unusual charge on my account. The amount seems incorrect for my current plan. Can someone please review this immediately? This is affecting our budget planning.',
    sentDate: '2025-01-09T09:15:00Z',
    sentiment: 'negative',
    priority: 'urgent',
    status: 'pending',
    category: 'Billing Support',
    extractedInfo: {
      contactDetails: ['john.doe@company.com'],
      requirements: ['Billing review', 'Account verification'],
      customerType: 'Enterprise',
      productMentioned: ['billing', 'account plan']
    }
  },
  {
    id: '3',
    sender: 'sarah.wilson@techcorp.com',
    subject: 'Request for feature enhancement',
    body: 'Great product! We love using your platform. Would it be possible to add dark mode support? Our team works late hours and this would be very helpful.',
    sentDate: '2025-01-09T08:45:00Z',
    sentiment: 'positive',
    priority: 'normal',
    status: 'pending',
    category: 'Feature Request',
    extractedInfo: {
      contactDetails: ['sarah.wilson@techcorp.com'],
      requirements: ['Dark mode feature'],
      customerType: 'Business',
      productMentioned: ['platform', 'dark mode']
    }
  },
  {
    id: '4',
    sender: 'mike.admin@enterprise.com',
    subject: 'Support needed for data migration',
    body: 'We are planning to migrate our data from our legacy system. Could you provide guidance on the best practices and any migration tools available?',
    sentDate: '2025-01-09T07:20:00Z',
    sentiment: 'neutral',
    priority: 'normal',
    status: 'responded',
    category: 'Migration Support',
    extractedInfo: {
      contactDetails: ['mike.admin@enterprise.com'],
      requirements: ['Data migration', 'Migration tools', 'Best practices'],
      customerType: 'Enterprise',
      productMentioned: ['migration tools', 'legacy system']
    }
  },
  {
    id: '5',
    sender: 'alex.dev@startup.co',
    subject: 'Help with API authentication',
    body: 'I\'m having trouble with the authentication flow. The JWT tokens seem to expire faster than expected. This is blocking our development.',
    sentDate: '2025-01-09T06:30:00Z',
    sentiment: 'negative',
    priority: 'urgent',
    status: 'responded',
    category: 'Technical Support',
    extractedInfo: {
      contactDetails: ['alex.dev@startup.co'],
      requirements: ['API authentication', 'JWT token issue'],
      customerType: 'Developer',
      productMentioned: ['API', 'JWT tokens', 'authentication']
    }
  }
];

export const mockStats: DashboardStats = {
  totalEmails: 127,
  emailsToday: 23,
  resolved: 89,
  pending: 38,
  urgent: 12,
  sentimentBreakdown: {
    positive: 45,
    negative: 28,
    neutral: 54
  }
};