import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { EmailList } from '@/components/dashboard/EmailList';
import { EmailDetail } from '@/components/dashboard/EmailDetail';
import { AnalyticsDashboard } from '@/components/dashboard/AnalyticsDashboard';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { mockEmails, mockStats } from '@/data/mockEmails';
import { Email } from '@/types/email';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedEmail, setSelectedEmail] = useState<Email | undefined>();
  const { toast } = useToast();

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email);
    setActiveView('emails');
  };

  const handleGenerateResponse = (emailId: string) => {
    toast({
      title: "AI Response Generated",
      description: "Context-aware response has been generated successfully.",
    });
  };

  const handleSendResponse = (emailId: string, response: string) => {
    toast({
      title: "Response Sent",
      description: "Your response has been sent successfully.",
    });
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'emails':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <EmailList 
              emails={mockEmails}
              onEmailSelect={handleEmailSelect}
              selectedEmail={selectedEmail}
            />
            {selectedEmail && (
              <div className="overflow-y-auto">
                <EmailDetail
                  email={selectedEmail}
                  onGenerateResponse={handleGenerateResponse}
                  onSendResponse={handleSendResponse}
                />
              </div>
            )}
          </div>
        );
      
      case 'analytics':
        return <AnalyticsDashboard stats={mockStats} />;
      
      case 'ai-insights':
        return (
          <div className="text-center py-12">
            <div className="animate-pulse-glow mb-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">AI Insights Coming Soon</h2>
            <p className="text-muted-foreground">Advanced AI analysis and recommendations will be available here.</p>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Emails"
                value={mockStats.totalEmails}
                description="All support emails"
                variant="primary"
              />
              <StatsCard
                title="Today's Emails"
                value={mockStats.emailsToday}
                description="Received today"
                trend="up"
              />
              <StatsCard
                title="Urgent Items"
                value={mockStats.urgent}
                description="Need immediate attention"
                variant="urgent"
              />
              <StatsCard
                title="Response Rate"
                value="94%"
                description="AI assistance enabled"
                variant="success"
                trend="up"
              />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <EmailList 
                  emails={mockEmails.slice(0, 5)}
                  onEmailSelect={handleEmailSelect}
                  selectedEmail={selectedEmail}
                />
              </div>
              
              <div className="space-y-4">
                <StatsCard
                  title="Positive Sentiment"
                  value={mockStats.sentimentBreakdown.positive}
                  description="Happy customers"
                  variant="success"
                />
                <StatsCard
                  title="Negative Sentiment"
                  value={mockStats.sentimentBreakdown.negative}
                  description="Needs attention"
                  variant="urgent"
                />
                <StatsCard
                  title="Pending Responses"
                  value={mockStats.pending}
                  description="Awaiting reply"
                  variant="warning"
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 p-6 overflow-hidden">
        <div className="h-full animate-fade-in">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
