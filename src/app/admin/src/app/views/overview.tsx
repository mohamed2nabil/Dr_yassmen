'use client';

import { useState, useEffect } from 'react';
import { LayoutDashboard, FolderKanban, Mail, Eye, MessageSquare, GraduationCap, Loader2 } from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getProjects } from '@/app/actions/projectActions';
import { getCourses } from '@/app/actions/courseActions';
import { getMessages } from '@/app/actions/messageActions';

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

export function OverviewPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    newMessages: 0,
    activeCourses: 0,
    totalViews: 1250, // Simulated baseline views
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOverviewData = async () => {
      try {
        const [projects, courses, messages] = await Promise.all([
          getProjects(),
          getCourses(),
          getMessages(),
        ]);

        // Calculate counts
        const totalProjectsCount = projects.length;
        const newMessagesCount = messages.filter((m) => !m.isRead).length;
        const activeCoursesCount = courses.filter((c) => c.status === 'Published').length;

        setStats((prev) => ({
          ...prev,
          totalProjects: totalProjectsCount,
          newMessages: newMessagesCount,
          activeCourses: activeCoursesCount,
        }));

        // Categories stats
        const categories = ['Visual Art', 'Interior Design', 'Art Education', 'Art Therapy'];
        const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-amber-500'];
        const catsMap = categories.map((cat, idx) => {
          const count = projects.filter((p) => p.category === cat).length;
          const percentage = totalProjectsCount > 0 ? Math.round((count / totalProjectsCount) * 100) : 0;
          return {
            name: cat,
            count,
            percentage,
            color: colors[idx],
          };
        });
        setCategoryStats(catsMap);

        // Recent activity
        const recentMsgs: RecentActivity[] = messages.slice(0, 3).map((m) => ({
          id: `msg-${m.id}`,
          type: 'message' as const,
          title: `New message from ${m.name}`,
          description: m.message,
          date: m.createdAt.toISOString(),
        }));

        const recentCourses: RecentActivity[] = courses.slice(0, 2).map((c) => ({
          id: `course-${c.id}`,
          type: 'course' as const,
          title: `New course created: "${c.title}"`,
          description: `Capacity: ${c.capacity}`,
          date: c.createdAt.toISOString(),
        }));

        const combined = [...recentMsgs, ...recentCourses].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setRecentActivities(combined);
      } catch (error) {
        console.error('Error loading dashboard overview:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOverviewData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin mb-2" />
        <p>Loading overview stats...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Overview</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, Dr. Allam. Here's what's happening with your portfolio.
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
          description="Baseline portfolio views"
          icon={Eye}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
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
            <CardTitle>Quick Stats</CardTitle>
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
