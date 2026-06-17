// TypeScript interfaces for Vouts (Visibility Control)

export type VoutItemType = 'project' | 'image' | 'testimonial' | 'course';

export interface VoutItem {
  id: string;
  type: VoutItemType;
  title: string;
  description?: string;
  thumbnail?: string;
  category?: string;
  isVisible: boolean;
  lastModified: string;
}
