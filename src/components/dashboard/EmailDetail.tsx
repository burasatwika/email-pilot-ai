import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Email } from '@/types/email';
import { cn } from '@/lib/utils';
import { 
  User, 
  Calendar, 
  Tag, 
  AlertTriangle, 
  Sparkles, 
  Send,
  Edit,
  Phone,
  MapPin,
  Briefcase,
  MessageSquare
} from 'lucide-react';

interface EmailDetailProps {
  email: Email;
  onGenerateResponse: (emailId: string) => void;
  onSendResponse: (emailId: string, response: string) => void;
}

export const EmailDetail = ({ email, onGenerateResponse, onSendResponse }: EmailDetailProps) => {
  const [aiResponse, setAiResponse] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateResponse = async () => {
    setIsGenerating(true);
    // Simulate AI response generation
    setTimeout(() => {
      const response = generateMockResponse(email);
      setAiResponse(response);
      setIsGenerating(false);
      setIsEditing(true);
    }, 2000);
  };

  const handleSendResponse = () => {
    onSendResponse(email.id, aiResponse);
    setIsEditing(false);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-success bg-success/10';
      case 'negative': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted/50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Email Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className={cn(
                'text-lg',
                email.priority === 'urgent' && 'text-urgent'
              )}>
                {email.subject}
                {email.priority === 'urgent' && (
                  <AlertTriangle className="inline h-5 w-5 ml-2 text-urgent" />
                )}
              </CardTitle>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {email.sender}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(email.sentDate)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className={getSentimentColor(email.sentiment)}>
                {email.sentiment}
              </Badge>
              <Badge variant="outline">
                {email.category}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground leading-relaxed">
              {email.body}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Extracted Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Extracted Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {email.extractedInfo.contactDetails && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                <Phone className="h-4 w-4" />
                Contact Details
              </h4>
              <div className="flex flex-wrap gap-1">
                {email.extractedInfo.contactDetails.map((contact, idx) => (
                  <Badge key={idx} variant="secondary">{contact}</Badge>
                ))}
              </div>
            </div>
          )}
          
          {email.extractedInfo.requirements && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                Requirements
              </h4>
              <div className="flex flex-wrap gap-1">
                {email.extractedInfo.requirements.map((req, idx) => (
                  <Badge key={idx} variant="outline">{req}</Badge>
                ))}
              </div>
            </div>
          )}
          
          {email.extractedInfo.productMentioned && (
            <div>
              <h4 className="text-sm font-medium mb-2">Products Mentioned</h4>
              <div className="flex flex-wrap gap-1">
                {email.extractedInfo.productMentioned.map((product, idx) => (
                  <Badge key={idx} className="bg-primary/10 text-primary">{product}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Response Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI Response Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!aiResponse && !isGenerating && (
            <Button 
              onClick={handleGenerateResponse}
              className="w-full bg-gradient-primary hover:scale-105 transition-smooth"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate AI Response
            </Button>
          )}
          
          {isGenerating && (
            <div className="text-center py-8">
              <div className="animate-pulse-glow">
                <Sparkles className="h-8 w-8 mx-auto mb-2 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Generating contextual response...</p>
            </div>
          )}
          
          {aiResponse && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Generated Response</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  {isEditing ? 'Preview' : 'Edit'}
                </Button>
              </div>
              
              {isEditing ? (
                <Textarea
                  value={aiResponse}
                  onChange={(e) => setAiResponse(e.target.value)}
                  className="min-h-[200px]"
                  placeholder="Edit the AI generated response..."
                />
              ) : (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{aiResponse}</p>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleSendResponse}
                  className="flex-1 bg-gradient-success hover:scale-105 transition-smooth"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Response
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleGenerateResponse}
                  disabled={isGenerating}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Mock AI response generator
const generateMockResponse = (email: Email): string => {
  const responses = {
    urgent: {
      positive: `Dear ${email.sender.split('@')[0]},

Thank you for reaching out to us! I understand this is urgent and I'm here to help you immediately.

Regarding your inquiry about ${email.extractedInfo.requirements?.[0] || 'your request'}, I can confirm that we have several solutions available that would be perfect for your needs.

I'll connect you with our technical team right away to ensure we get this resolved before your client presentation tomorrow. You can expect a follow-up call within the next hour.

Is there a preferred time and phone number where we can reach you today?

Best regards,
Customer Success Team`,
      
      negative: `Dear ${email.sender.split('@')[0]},

I sincerely apologize for the inconvenience you're experiencing. I understand how frustrating this must be, especially with the urgency of your situation.

I'm immediately escalating your case to our senior technical team. We're treating this as our highest priority and will have a resolution for you within the next 2 hours.

In the meantime, I'm personally monitoring your account to ensure no further issues occur. You'll receive updates every 30 minutes until we've completely resolved this matter.

Please don't hesitate to contact me directly if you need anything else.

Warm regards,
Customer Success Team`,
      
      neutral: `Dear ${email.sender.split('@')[0]},

Thank you for contacting us regarding ${email.extractedInfo.requirements?.[0] || 'your inquiry'}. I understand this is time-sensitive and I'm committed to getting you the information you need today.

Based on your requirements, I can provide you with several options that would work well for your use case. I'll prepare a detailed proposal and send it to you within the next hour.

Would you be available for a brief call this afternoon to discuss the implementation details? This would ensure we address all your concerns before your deadline.

Best regards,
Customer Success Team`
    },
    normal: {
      positive: `Dear ${email.sender.split('@')[0]},

Thank you for your wonderful feedback! It's great to hear that you're enjoying our platform.

Regarding your request for ${email.extractedInfo.requirements?.[0] || 'the feature you mentioned'}, I have some exciting news. This is actually on our roadmap for the next quarter, and I'd love to include your team in our beta testing program.

I'll keep you updated on our progress and reach out when the feature is available for testing.

Thank you for being such a valued customer!

Best regards,
Customer Success Team`,
      
      negative: `Dear ${email.sender.split('@')[0]},

Thank you for bringing this to our attention. I understand your concerns and I'm here to help resolve this matter quickly.

I've reviewed your account and I can see exactly what happened. I'll work with our team to implement a solution and follow up with you by end of business today with a complete resolution plan.

Your feedback is valuable to us and helps us improve our service for everyone.

Best regards,
Customer Success Team`,
      
      neutral: `Dear ${email.sender.split('@')[0]},

Thank you for your inquiry about ${email.extractedInfo.requirements?.[0] || 'our services'}. I'm happy to provide you with the information you need.

I'll prepare a comprehensive guide covering your specific requirements and send it to you within the next business day. If you have any urgent questions in the meantime, please don't hesitate to reach out.

Best regards,
Customer Success Team`
    }
  };

  const priority = email.priority;
  const sentiment = email.sentiment;
  
  return responses[priority][sentiment] || responses.normal.neutral;
};