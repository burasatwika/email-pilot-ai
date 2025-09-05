import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Mail, 
  BarChart3, 
  Settings, 
  Sparkles,
  Users,
  TrendingUp
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar = ({ activeView, onViewChange }: SidebarProps) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Overview & Analytics'
    },
    {
      id: 'emails',
      label: 'Email Manager',
      icon: Mail,
      description: 'Inbox & Responses'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      description: 'Detailed Reports'
    },
    {
      id: 'ai-insights',
      label: 'AI Insights',
      icon: Sparkles,
      description: 'Smart Analysis'
    }
  ];

  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col shadow-soft">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">AI Assistant</h1>
            <p className="text-xs text-muted-foreground">Communication Hub</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeView === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-auto p-3 transition-smooth",
                activeView === item.id 
                  ? "bg-gradient-primary text-white shadow-glow" 
                  : "hover:bg-muted/50"
              )}
              onClick={() => onViewChange(item.id)}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">{item.label}</div>
                <div className={cn(
                  "text-xs",
                  activeView === item.id ? "text-white/80" : "text-muted-foreground"
                )}>
                  {item.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </nav>

      {/* Footer Stats */}
      <div className="p-4 border-t border-border">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Active Today</span>
            <span className="font-medium text-success">23 emails</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Response Rate</span>
            <span className="font-medium text-primary">94%</span>
          </div>
        </div>
      </div>
    </div>
  );
};