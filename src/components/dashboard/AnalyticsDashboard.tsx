import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStats } from '@/types/email';
import { StatsCard } from './StatsCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface AnalyticsDashboardProps {
  stats: DashboardStats;
}

export const AnalyticsDashboard = ({ stats }: AnalyticsDashboardProps) => {
  const sentimentData = [
    { name: 'Positive', value: stats.sentimentBreakdown.positive, color: 'hsl(var(--success))' },
    { name: 'Negative', value: stats.sentimentBreakdown.negative, color: 'hsl(var(--destructive))' },
    { name: 'Neutral', value: stats.sentimentBreakdown.neutral, color: 'hsl(var(--muted-foreground))' }
  ];

  const statusData = [
    { name: 'Resolved', value: stats.resolved },
    { name: 'Pending', value: stats.pending },
    { name: 'Urgent', value: stats.urgent }
  ];

  const resolutionRate = Math.round((stats.resolved / stats.totalEmails) * 100);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Emails"
          value={stats.totalEmails}
          description="All time"
          variant="primary"
        />
        
        <StatsCard
          title="Today's Emails"
          value={stats.emailsToday}
          description="Last 24 hours"
          trend="up"
        />
        
        <StatsCard
          title="Urgent Items"
          value={stats.urgent}
          description="Needs immediate attention"
          variant={stats.urgent > 10 ? "urgent" : "warning"}
        />
        
        <StatsCard
          title="Resolution Rate"
          value={`${resolutionRate}%`}
          description="Emails resolved"
          variant="success"
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Email Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="url(#statusGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="statusGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sentiment Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Resolved"
          value={stats.resolved}
          description="Successfully handled"
          variant="success"
        />
        
        <StatsCard
          title="Pending"
          value={stats.pending}
          description="Awaiting response"
        />
        
        <StatsCard
          title="Positive Sentiment"
          value={stats.sentimentBreakdown.positive}
          description="Happy customers"
          variant="success"
        />
        
        <StatsCard
          title="Negative Sentiment"
          value={stats.sentimentBreakdown.negative}
          description="Needs attention"
          variant="urgent"
        />
      </div>
    </div>
  );
};