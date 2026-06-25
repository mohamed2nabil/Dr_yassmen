'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getProjects() {
  try {
    return await db.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
}

export async function getProject(id: number) {
  try {
    return await db.project.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    throw new Error('Failed to fetch project');
  }
}

export async function createProject(data: {
  title: string;
  category: string;
  description: string;
  dateLocation: string;
  mainImage: string;
  beforeImage?: string | null;
  afterImage?: string | null;
  isVisible?: boolean;
}) {
  try {
    const project = await db.project.create({
      data: {
        title: data.title,
        category: data.category,
        description: data.description,
        dateLocation: data.dateLocation,
        mainImage: data.mainImage,
        beforeImage: data.beforeImage || null,
        afterImage: data.afterImage || null,
        isVisible: data.isVisible !== undefined ? data.isVisible : true,
      },
    });

    revalidatePath('/admin/projects');
    revalidatePath('/admin/vouts');
    revalidatePath('/');
    
    const result = { success: true as const, data: project };
    return Object.assign(result, project);
  } catch (error: any) {
    console.error('Error creating project:', error);
    return { success: false as const, error: error.message || 'Failed to create project' };
  }
}

export async function updateProject(
  id: number,
  data: {
    title?: string;
    category?: string;
    description?: string;
    dateLocation?: string;
    mainImage?: string;
    beforeImage?: string | null;
    afterImage?: string | null;
    isVisible?: boolean;
  }
) {
  try {
    const project = await db.project.update({
      where: { id },
      data,
    });

    revalidatePath('/admin/projects');
    revalidatePath('/admin/vouts');
    revalidatePath('/');
    
    const result = { success: true as const, data: project };
    return Object.assign(result, project);
  } catch (error: any) {
    console.error('Error updating project:', error);
    return { success: false as const, error: error.message || 'Failed to update project' };
  }
}

export async function deleteProject(id: number) {
  try {
    const project = await db.project.delete({
      where: { id },
    });

    revalidatePath('/admin/projects');
    revalidatePath('/admin/vouts');
    revalidatePath('/');
    
    const result = { success: true as const, data: project };
    return Object.assign(result, project);
  } catch (error: any) {
    console.error('Error deleting project:', error);
    return { success: false as const, error: error.message || 'Failed to delete project' };
  }
}

export async function toggleProjectVisibility(id: number) {
  try {
    const project = await db.project.findUnique({
      where: { id },
      select: { isVisible: true },
    });

    if (!project) {
      return { success: false as const, error: 'Project not found' };
    }

    const updated = await db.project.update({
      where: { id },
      data: { isVisible: !project.isVisible },
    });

    revalidatePath('/admin/projects');
    revalidatePath('/admin/vouts');
    revalidatePath('/');
    
    const result = { success: true as const, data: updated };
    return Object.assign(result, updated);
  } catch (error: any) {
    console.error('Error toggling project visibility:', error);
    return { success: false as const, error: error.message || 'Failed to toggle project visibility' };
  }
}
