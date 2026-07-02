'use client';

import { LayoutDashboard, FolderKanban, Mail, Eye, MessageSquare, GraduationCap } from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type DashboardStats = {
  totalProjects: number;
  newMessages: number;
  activeCourses: number;
  totalViews: number;
};

type RecentActivity = {
  id: string;
  type: 'message' | 'course';
  title: string;
  description: string;
  date: string;
};

type CategoryStats = {
  name: string;
  count: number;
  percentage: number;
  color: string;
};

interface OverviewPageProps {
  initialProjects?: any[];
  initialCourses?: any[];
  initialMessages?: any[];
  initialViews?: number;
}

export function OverviewPage({
  initialProjects = [],
  initialCourses = [],
  initialMessages = [],
  initialViews = 0,
}: OverviewPageProps) {
  const totalProjectsCount = initialProjects.length;
  const newMessagesCount = initialMessages.filter((m) => !m.isRead).length;
  const activeCoursesCount = initialCourses.filter((c) => c.status === 'Published').length;

  const stats: DashboardStats = {
    totalProjects: totalProjectsCount,
    newMessages: newMessagesCount,
    activeCourses: activeCoursesCount,
    totalViews: initialViews,
  };

  // Categories stats
  const categories = ['Visual Art', 'Interior Design', 'Art Education', 'Art Therapy'];
  const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-amber-500'];
  const categoryStats: CategoryStats[] = categories.map((cat, idx) => {
    const count = initialProjects.filter((p) => p.category === cat).length;
    const percentage = totalProjectsCount > 0 ? Math.round((count / totalProjectsCount) * 100) : 0;
    return {
      name: cat,
      count,
      percentage,
      color: colors[idx],
    };
  });

  // Recent activity
  const recentMsgs: RecentActivity[] = initialMessages.slice(0, 3).map((m: any) => ({
    id: `msg-${m.id}`,
    type: 'message' as const,
    title: `New message from ${m.name}`,
    description: m.message,
    date: typeof m.createdAt === 'string' ? m.createdAt : m.createdAt.toISOString(),
  }));

  const recentCourses: RecentActivity[] = initialCourses.slice(0, 2).map((c: any) => ({
    id: `course-${c.id}`,
    type: 'course' as const,
    title: `New course created: "${c.title}"`,
    description: `Capacity: ${c.capacity}`,
    date: typeof c.createdAt === 'string' ? c.createdAt : c.createdAt.toISOString(),
  }));

  const recentActivities = [...recentMsgs, ...recentCourses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold font-serif">Overview</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, Dr. Yassmin. Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Projects"
          value={stats.totalProjects}
          description="Across all categories"
          icon={FolderKanban}
        />
        <StatCard
          title="New Messages"
          value={stats.newMessages}
          description="Unread inquiries"
          icon={Mail}
        />
        <StatCard
          title="Active Courses"
          value={stats.activeCourses}
          description="Currently published"
          icon={GraduationCap}
        />
        <StatCard
          title="Total Views"
          value={stats.totalViews.toLocaleString()}
          description="Actual site page views"
          icon={Eye}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Recent Activity</CardTitle>
            <CardDescription>Latest updates from your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No recent activity</p>
              ) : (
                recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 pb-4 last:pb-0 border-b last:border-0"
                  >
                    <div
                      className={`mt-1 p-2 rounded-lg ${
                        activity.type === 'message'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {activity.type === 'message' ? (
                        <MessageSquare className="h-4 w-4" />
                      ) : (
                        <GraduationCap className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground font-semibold">
                        {new Date(activity.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Quick Stats</CardTitle>
            <CardDescription>Project distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryStats.map((stat) => (
                <div key={stat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${stat.color}`} />
                    <span className="text-sm">{stat.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{stat.count} projects</span>
                    <Badge variant="secondary" className="text-xs">
                      {stat.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
