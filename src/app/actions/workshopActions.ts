'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getWorkshops() {
  try {
    return await db.workshop.findMany({
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.error('Error fetching workshops:', error);
    throw new Error('Failed to fetch workshops');
  }
}

export async function getWorkshop(id: number) {
  try {
    return await db.workshop.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error fetching workshop:', error);
    throw new Error('Failed to fetch workshop');
  }
}

export async function createWorkshop(data: {
  title: string;
  arabicTitle: string;
  description: string;
  sessions: string;
  format: string;
  iconName: string;
  isVisible?: boolean;
  order?: number;
}) {
  try {
    const workshop = await db.workshop.create({
      data: {
        title: data.title,
        arabicTitle: data.arabicTitle,
        description: data.description,
        sessions: data.sessions,
        format: data.format,
        iconName: data.iconName,
        isVisible: data.isVisible !== undefined ? data.isVisible : true,
        order: data.order !== undefined ? data.order : 0,
      },
    });
    revalidatePath('/admin/workshops');
    revalidatePath('/');
    return { success: true, data: workshop };
  } catch (error: any) {
    console.error('Error creating workshop:', error);
    return { success: false, error: error.message || 'Failed to create workshop' };
  }
}

export async function updateWorkshop(
  id: number,
  data: {
    title?: string;
    arabicTitle?: string;
    description?: string;
    sessions?: string;
    format?: string;
    iconName?: string;
    isVisible?: boolean;
    order?: number;
  }
) {
  try {
    const workshop = await db.workshop.update({
      where: { id },
      data,
    });
    revalidatePath('/admin/workshops');
    revalidatePath('/');
    return { success: true, data: workshop };
  } catch (error: any) {
    console.error('Error updating workshop:', error);
    return { success: false, error: error.message || 'Failed to update workshop' };
  }
}

export async function deleteWorkshop(id: number) {
  try {
    const workshop = await db.workshop.delete({
      where: { id },
    });
    revalidatePath('/admin/workshops');
    revalidatePath('/');
    return { success: true, data: workshop };
  } catch (error: any) {
    console.error('Error deleting workshop:', error);
    return { success: false, error: error.message || 'Failed to delete workshop' };
  }
}

export async function toggleWorkshopVisibility(id: number) {
  try {
    const workshop = await db.workshop.findUnique({
      where: { id },
      select: { isVisible: true },
    });

    if (!workshop) {
      return { success: false, error: 'Workshop not found' };
    }

    const updated = await db.workshop.update({
      where: { id },
      data: { isVisible: !workshop.isVisible },
    });

    revalidatePath('/admin/workshops');
    revalidatePath('/');
    return { success: true, data: updated };
  } catch (error: any) {
    console.error('Error toggling workshop visibility:', error);
    return { success: false, error: error.message || 'Failed to toggle visibility' };
  }
}
