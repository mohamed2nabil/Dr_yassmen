'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// --- Testimonial / Vout CRUD ---

export async function getTestimonials() {
  try {
    return await db.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw new Error('Failed to fetch testimonials');
  }
}

export async function getTestimonial(id: number) {
  try {
    return await db.testimonial.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    throw new Error('Failed to fetch testimonial');
  }
}

export async function createTestimonial(data: {
  clientName: string;
  content: string;
  role: string;
  isVisible?: boolean;
}) {
  try {
    const testimonial = await db.testimonial.create({
      data: {
        clientName: data.clientName,
        content: data.content,
        role: data.role,
        isVisible: data.isVisible !== undefined ? data.isVisible : true,
      },
    });
    revalidatePath('/admin/testimonials');
    revalidatePath('/admin/vouts');
    revalidatePath('/');
    
    const result = { success: true as const, data: testimonial };
    return Object.assign(result, testimonial);
  } catch (error: any) {
    console.error('Error creating testimonial:', error);
    return { success: false as const, error: error.message || 'Failed to create testimonial' };
  }
}

export async function updateTestimonial(
  id: number,
  data: {
    clientName?: string;
    content?: string;
    role?: string;
    isVisible?: boolean;
  }
) {
  try {
    const testimonial = await db.testimonial.update({
      where: { id },
      data,
    });
    revalidatePath('/admin/testimonials');
    revalidatePath('/admin/vouts');
    revalidatePath('/');
    
    const result = { success: true as const, data: testimonial };
    return Object.assign(result, testimonial);
  } catch (error: any) {
    console.error('Error updating testimonial:', error);
    return { success: false as const, error: error.message || 'Failed to update testimonial' };
  }
}

export async function deleteTestimonial(id: number) {
  try {
    const testimonial = await db.testimonial.delete({
      where: { id },
    });
    revalidatePath('/admin/testimonials');
    revalidatePath('/admin/vouts');
    revalidatePath('/');
    
    const result = { success: true as const, data: testimonial };
    return Object.assign(result, testimonial);
  } catch (error: any) {
    console.error('Error deleting testimonial:', error);
    return { success: false as const, error: error.message || 'Failed to delete testimonial' };
  }
}

export async function toggleTestimonialVisibility(id: number) {
  try {
    const testimonial = await db.testimonial.findUnique({
      where: { id },
      select: { isVisible: true },
    });

    if (!testimonial) {
      return { success: false as const, error: 'Testimonial not found' };
    }

    const updated = await db.testimonial.update({
      where: { id },
      data: { isVisible: !testimonial.isVisible },
    });

    revalidatePath('/admin/testimonials');
    revalidatePath('/admin/vouts');
    revalidatePath('/');
    
    const result = { success: true as const, data: updated };
    return Object.assign(result, updated);
  } catch (error: any) {
    console.error('Error toggling testimonial visibility:', error);
    return { success: false as const, error: error.message || 'Failed to toggle testimonial visibility' };
  }
}

// --- Aliases for Vout Naming Schema Compatibility ---

export const getVouts = getTestimonials;
export const getVout = getTestimonial;
export const createVout = createTestimonial;
export const updateVout = updateTestimonial;
export const deleteVout = deleteTestimonial;
export const toggleVoutVisibility = toggleTestimonialVisibility;
