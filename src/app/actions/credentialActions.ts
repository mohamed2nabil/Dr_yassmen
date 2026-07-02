'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getCredentials() {
  try {
    return await db.credential.findMany({
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.error('Error fetching credentials:', error);
    throw new Error('Failed to fetch credentials');
  }
}

export async function getCredential(id: number) {
  try {
    return await db.credential.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error fetching credential:', error);
    throw new Error('Failed to fetch credential');
  }
}

export async function createCredential(data: {
  degree: string;
  field: string;
  institution: string;
  order?: number;
}) {
  try {
    const credential = await db.credential.create({
      data: {
        degree: data.degree,
        field: data.field,
        institution: data.institution,
        order: data.order !== undefined ? data.order : 0,
      },
    });
    revalidatePath('/admin/settings');
    revalidatePath('/');
    return { success: true, data: credential };
  } catch (error: any) {
    console.error('Error creating credential:', error);
    return { success: false, error: error.message || 'Failed to create credential' };
  }
}

export async function updateCredential(
  id: number,
  data: {
    degree?: string;
    field?: string;
    institution?: string;
    order?: number;
  }
) {
  try {
    const credential = await db.credential.update({
      where: { id },
      data,
    });
    revalidatePath('/admin/settings');
    revalidatePath('/');
    return { success: true, data: credential };
  } catch (error: any) {
    console.error('Error updating credential:', error);
    return { success: false, error: error.message || 'Failed to update credential' };
  }
}

export async function deleteCredential(id: number) {
  try {
    const credential = await db.credential.delete({
      where: { id },
    });
    revalidatePath('/admin/settings');
    revalidatePath('/');
    return { success: true, data: credential };
  } catch (error: any) {
    console.error('Error deleting credential:', error);
    return { success: false, error: error.message || 'Failed to delete credential' };
  }
}
