'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

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

export async function createTestimonial(data: {
  clientName: string;
  content: string;
  role: string;
}) {
  try {
    const testimonial = await db.testimonial.create({
      data,
    });
    revalidatePath('/admin/testimonials');
    revalidatePath('/admin/vouts');
    revalidatePath('/');
    return testimonial;
  } catch (error) {
    console.error('Error creating testimonial:', error);
    throw new Error('Failed to create testimonial');
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
    return testimonial;
  } catch (error) {
    console.error('Error updating testimonial:', error);
    throw new Error('Failed to update testimonial');
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
    return testimonial;
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    throw new Error('Failed to delete testimonial');
  }
}

export async function toggleTestimonialVisibility(id: number) {
  try {
    const testimonial = await db.testimonial.findUnique({
      where: { id },
      select: { isVisible: true },
    });

    if (!testimonial) throw new Error('Testimonial not found');

    const updated = await db.testimonial.update({
      where: { id },
      data: { isVisible: !testimonial.isVisible },
    });

    revalidatePath('/admin/testimonials');
    revalidatePath('/admin/vouts');
    revalidatePath('/');
    return updated;
  } catch (error) {
    console.error('Error toggling testimonial visibility:', error);
    throw new Error('Failed to toggle testimonial visibility');
  }
}
