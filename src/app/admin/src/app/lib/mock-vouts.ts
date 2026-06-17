// Mock data for Vouts (Visibility Control)

import { VoutItem } from '@/types/vouts';

export const mockVoutItems: VoutItem[] = [
  // Projects
  {
    id: 'p1',
    type: 'project',
    title: 'Abstract Expressions',
    description: 'A contemporary exploration of emotions through abstract forms',
    thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
    category: 'Visual Art',
    isVisible: true,
    lastModified: '2024-06-15',
  },
  {
    id: 'p2',
    type: 'project',
    title: 'Modern Living Room Redesign',
    description: 'Complete transformation of a traditional space',
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    category: 'Interior Design',
    isVisible: true,
    lastModified: '2024-06-10',
  },
  {
    id: 'p3',
    type: 'project',
    title: 'Therapeutic Art Workshop Series',
    description: 'A 6-week program using art as a medium for emotional healing',
    thumbnail: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400',
    category: 'Art Therapy',
    isVisible: false,
    lastModified: '2024-04-20',
  },
  {
    id: 'p4',
    type: 'project',
    title: 'Children\'s Creative Development Program',
    description: 'Educational curriculum designed to foster creativity',
    thumbnail: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400',
    category: 'Art Education',
    isVisible: true,
    lastModified: '2024-05-28',
  },
  
  // Images
  {
    id: 'i1',
    type: 'image',
    title: 'hero-background-1.jpg',
    thumbnail: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400',
    category: 'Hero Section',
    isVisible: true,
    lastModified: '2024-06-01',
  },
  {
    id: 'i2',
    type: 'image',
    title: 'studio-workspace.jpg',
    thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400',
    category: 'Visual Art',
    isVisible: true,
    lastModified: '2024-05-28',
  },
  {
    id: 'i3',
    type: 'image',
    title: 'interior-design-showcase.jpg',
    thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400',
    category: 'Interior Design',
    isVisible: false,
    lastModified: '2024-05-10',
  },
  
  // Testimonials
  {
    id: 't1',
    type: 'testimonial',
    title: 'Sarah Johnson - Interior Design Client',
    description: 'Dr. Allam transformed my home into a beautiful, functional space that exceeded all my expectations.',
    isVisible: true,
    lastModified: '2024-06-12',
  },
  {
    id: 't2',
    type: 'testimonial',
    title: 'Michael Chen - Art Therapy Participant',
    description: 'The art therapy sessions helped me process emotions I didn\'t know how to express. Truly life-changing.',
    isVisible: true,
    lastModified: '2024-06-08',
  },
  {
    id: 't3',
    type: 'testimonial',
    title: 'Emily Martinez - Art Education Student',
    description: 'Dr. Allam\'s teaching methods are innovative and inspiring. She brings out the best in every student.',
    isVisible: false,
    lastModified: '2024-05-25',
  },
  
  // Courses
  {
    id: 'c1',
    type: 'course',
    title: 'Introduction to Abstract Painting',
    description: 'Learn the fundamentals of abstract art',
    thumbnail: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400',
    isVisible: true,
    lastModified: '2024-06-14',
  },
  {
    id: 'c2',
    type: 'course',
    title: 'Interior Design Fundamentals',
    description: 'Comprehensive course covering space planning',
    thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400',
    isVisible: true,
    lastModified: '2024-06-10',
  },
  {
    id: 'c3',
    type: 'course',
    title: 'Teaching Art to Children',
    description: 'Practical strategies for educators',
    thumbnail: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400',
    isVisible: false,
    lastModified: '2024-05-20',
  },
];
