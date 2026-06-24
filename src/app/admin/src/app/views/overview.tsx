"use client";

import { LayoutDashboard, FolderKanban, Mail, Eye, MessageSquare, GraduationCap } from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockStats, mockRecentActivity } from '@/lib/mock-data';

export function OverviewPage() {
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
          value={mockStats.totalProjects}
          description="Across all categories"
          icon={FolderKanban}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="New Messages"
          value={mockStats.newMessages}
          description="Unread inquiries"
          icon={Mail}
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Active Courses"
          value={mockStats.activeCourses}
          description="Currently running"
          icon={GraduationCap}
        />
        <StatCard
          title="Total Views"
          value={mockStats.totalViews.toLocaleString()}
          description="This month"
          icon={Eye}
          trend={{ value: 18, positive: true }}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates from your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-4 last:pb-0 border-b last:border-0"
                >
                  <div className={`mt-1 p-2 rounded-lg ${
                    activity.type === 'message' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {activity.type === 'message' ? (
                      <MessageSquare className="h-4 w-4" />
                    ) : (
                      <GraduationCap className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>
              Project distribution by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500" />
                  <span className="text-sm">Visual Art</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">8 projects</span>
                  <Badge variant="secondary" className="text-xs">33%</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-sm">Interior Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">7 projects</span>
                  <Badge variant="secondary" className="text-xs">29%</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm">Art Education</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">5 projects</span>
                  <Badge variant="secondary" className="text-xs">21%</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  <span className="text-sm">Art Therapy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">4 projects</span>
                  <Badge variant="secondary" className="text-xs">17%</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
