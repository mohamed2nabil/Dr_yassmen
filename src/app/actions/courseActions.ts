'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getCourses() {
  try {
    return await db.course.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Failed to fetch courses');
  }
}

export async function getCourse(id: number) {
  try {
    return await db.course.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    throw new Error('Failed to fetch course');
  }
}

export async function createCourse(data: {
  title: string;
  category: string;
  duration: string;
  date: string | Date;
  description: string;
  imageUrl: string;
  capacity?: number;
  enrolled?: number;
  status?: string;
  isVisible?: boolean;
}) {
  try {
    const course = await db.course.create({
      data: {
        title: data.title,
        category: data.category,
        duration: data.duration,
        date: new Date(data.date),
        description: data.description,
        imageUrl: data.imageUrl,
        capacity: data.capacity !== undefined ? data.capacity : 20,
        enrolled: data.enrolled !== undefined ? data.enrolled : 0,
        status: data.status || 'Draft',
        isVisible: data.isVisible !== undefined ? data.isVisible : true,
      },
    });

    revalidatePath('/admin/courses');
    revalidatePath('/admin/vouts');
    revalidatePath('/courses');
    revalidatePath('/');
    
    const result = { success: true as const, data: course };
    return Object.assign(result, course);
  } catch (error: any) {
    console.error('Error creating course:', error);
    return { success: false as const, error: error.message || 'Failed to create course' };
  }
}

export async function updateCourse(
  id: number,
  data: {
    title?: string;
    category?: string;
    duration?: string;
    date?: string | Date;
    description?: string;
    imageUrl?: string;
    capacity?: number;
    enrolled?: number;
    status?: string;
    isVisible?: boolean;
  }
) {
  try {
    const updateData: any = { ...data };
    if (data.date) {
      updateData.date = new Date(data.date);
    }

    const course = await db.course.update({
      where: { id },
      data: updateData,
    });

    revalidatePath('/admin/courses');
    revalidatePath('/admin/vouts');
    revalidatePath('/courses');
    revalidatePath('/');
    
    const result = { success: true as const, data: course };
    return Object.assign(result, course);
  } catch (error: any) {
    console.error('Error updating course:', error);
    return { success: false as const, error: error.message || 'Failed to update course' };
  }
}

export async function deleteCourse(id: number) {
  try {
    const course = await db.course.delete({
      where: { id },
    });

    revalidatePath('/admin/courses');
    revalidatePath('/admin/vouts');
    revalidatePath('/courses');
    revalidatePath('/');
    
    const result = { success: true as const, data: course };
    return Object.assign(result, course);
  } catch (error: any) {
    console.error('Error deleting course:', error);
    return { success: false as const, error: error.message || 'Failed to delete course' };
  }
}

export async function toggleCourseVisibility(id: number) {
  try {
    const course = await db.course.findUnique({
      where: { id },
      select: { isVisible: true },
    });

    if (!course) {
      return { success: false as const, error: 'Course not found' };
    }

    const updated = await db.course.update({
      where: { id },
      data: { isVisible: !course.isVisible },
    });

    revalidatePath('/admin/courses');
    revalidatePath('/admin/vouts');
    revalidatePath('/courses');
    revalidatePath('/');
    
    const result = { success: true as const, data: updated };
    return Object.assign(result, updated);
  } catch (error: any) {
    console.error('Error toggling course visibility:', error);
    return { success: false as const, error: error.message || 'Failed to toggle course visibility' };
  }
}
