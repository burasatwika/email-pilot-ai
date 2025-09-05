import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'urgent';
  className?: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  description, 
  trend, 
  variant = 'default',
  className 
}: StatsCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-primary text-white shadow-glow';
      case 'success':
        return 'bg-gradient-success text-white';
      case 'warning':
        return 'bg-gradient-warning text-white';
      case 'urgent':
        return 'bg-gradient-danger text-white animate-pulse-glow';
      default:
        return 'bg-card shadow-soft hover:shadow-medium';
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    
    switch (trend) {
      case 'up':
        return <span className="text-success">↗</span>;
      case 'down':
        return <span className="text-destructive">↘</span>;
      default:
        return <span className="text-muted-foreground">→</span>;
    }
  };

  return (
    <Card className={cn(
      'transition-smooth hover:scale-105',
      getVariantStyles(),
      className
    )}>
      <CardHeader className="pb-2">
        <CardTitle className={cn(
          'text-sm font-medium flex items-center justify-between',
          variant !== 'default' ? 'text-current' : 'text-muted-foreground'
        )}>
          {title}
          {getTrendIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={cn(
          'text-2xl font-bold mb-1',
          variant !== 'default' ? 'text-current' : 'text-foreground'
        )}>
          {value}
        </div>
        {description && (
          <p className={cn(
            'text-xs',
            variant !== 'default' ? 'text-current opacity-90' : 'text-muted-foreground'
          )}>
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};