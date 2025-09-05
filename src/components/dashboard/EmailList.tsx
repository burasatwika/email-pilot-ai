import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Email } from '@/types/email';
import { cn } from '@/lib/utils';
import { Clock, Mail, AlertTriangle, CheckCircle, User, MessageSquare } from 'lucide-react';

interface EmailListProps {
  emails: Email[];
  onEmailSelect: (email: Email) => void;
  selectedEmail?: Email;
}

export const EmailList = ({ emails, onEmailSelect, selectedEmail }: EmailListProps) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-success text-success-foreground';
      case 'negative': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority: string) => {
    return priority === 'urgent' ? (
      <AlertTriangle className="h-4 w-4 text-urgent" />
    ) : (
      <Clock className="h-4 w-4 text-muted-foreground" />
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'responded':
        return <MessageSquare className="h-4 w-4 text-primary" />;
      default:
        return <Mail className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  // Sort emails by priority (urgent first) and then by date
  const sortedEmails = [...emails].sort((a, b) => {
    if (a.priority === 'urgent' && b.priority !== 'urgent') return -1;
    if (b.priority === 'urgent' && a.priority !== 'urgent') return 1;
    return new Date(b.sentDate).getTime() - new Date(a.sentDate).getTime();
  });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Support Emails ({emails.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[600px] overflow-y-auto">
          {sortedEmails.map((email) => (
            <div
              key={email.id}
              className={cn(
                'p-4 border-b border-border cursor-pointer transition-smooth hover:bg-muted/50',
                selectedEmail?.id === email.id && 'bg-primary/5 border-l-4 border-l-primary',
                email.priority === 'urgent' && 'bg-urgent/5'
              )}
              onClick={() => onEmailSelect(email)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {getPriorityIcon(email.priority)}
                    <span className="text-sm font-medium text-foreground truncate">
                      {email.sender}
                    </span>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(email.status)}
                      <Badge variant="outline" className={getSentimentColor(email.sentiment)}>
                        {email.sentiment}
                      </Badge>
                    </div>
                  </div>
                  
                  <h4 className={cn(
                    'font-semibold text-sm mb-1 truncate',
                    email.priority === 'urgent' ? 'text-urgent' : 'text-foreground'
                  )}>
                    {email.subject}
                  </h4>
                  
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {email.body}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {email.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(email.sentDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};