// TypeScript interfaces for the Admin Dashboard

export type ProjectCategory = 'Visual Art' | 'Interior Design' | 'Art Education' | 'Art Therapy';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  thumbnail: string;
  date: string;
  beforeImage?: string; // For Interior Design projects
  afterImage?: string; // For Interior Design projects
}

export type CourseStatus = 'Draft' | 'Published';

export interface Course {
  id: string;
  title: string;
  description: string;
  status: CourseStatus;
  date: string;
  duration: string;
  capacity: number;
  enrolled: number;
  image: string;
}

export type MessageStatus = 'Read' | 'Unread';

export interface Message {
  id: string;
  senderName: string;
  email: string;
  subject: string;
  message: string;
  interests: ProjectCategory[];
  date: string;
  status: MessageStatus;
}

export interface MediaItem {
  id: string;
  url: string;
  name: string;
  uploadDate: string;
  size: string;
}

export interface DashboardStats {
  totalProjects: number;
  newMessages: number;
  activeCourses: number;
  totalViews: number;
}

export interface RecentActivity {
  id: string;
  type: 'message' | 'course';
  title: string;
  description: string;
  date: string;
}
