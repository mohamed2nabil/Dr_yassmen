'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getStats() {
  try {
    return await db.stat.findMany();
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw new Error('Failed to fetch stats');
  }
}

export async function getStat(id: number) {
  try {
    return await db.stat.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error fetching stat:', error);
    throw new Error('Failed to fetch stat');
  }
}

export async function createStat(data: { value: string; label: string }) {
  try {
    const stat = await db.stat.create({
      data,
    });
    revalidatePath('/admin/stats');
    revalidatePath('/');
    
    const result = { success: true as const, data: stat };
    return Object.assign(result, stat);
  } catch (error: any) {
    console.error('Error creating stat:', error);
    return { success: false as const, error: error.message || 'Failed to create stat' };
  }
}

export async function updateStat(id: number, data: { value: string; label: string }) {
  try {
    const stat = await db.stat.update({
      where: { id },
      data,
    });
    revalidatePath('/admin/stats');
    revalidatePath('/');
    
    const result = { success: true as const, data: stat };
    return Object.assign(result, stat);
  } catch (error: any) {
    console.error('Error updating stat:', error);
    return { success: false as const, error: error.message || 'Failed to update stat' };
  }
}

export async function deleteStat(id: number) {
  try {
    const stat = await db.stat.delete({
      where: { id },
    });
    revalidatePath('/admin/stats');
    revalidatePath('/');
    
    const result = { success: true as const, data: stat };
    return Object.assign(result, stat);
  } catch (error: any) {
    console.error('Error deleting stat:', error);
    return { success: false as const, error: error.message || 'Failed to delete stat' };
  }
}
