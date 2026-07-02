'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getTherapyStories() {
  try {
    return await db.therapyStory.findMany({
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.error('Error fetching therapy stories:', error);
    throw new Error('Failed to fetch therapy stories');
  }
}

export async function getTherapyStory(id: number) {
  try {
    return await db.therapyStory.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error fetching therapy story:', error);
    throw new Error('Failed to fetch therapy story');
  }
}

export async function createTherapyStory(data: {
  initials: string;
  age: string;
  context: string;
  quote: string;
  color: string;
  isVisible?: boolean;
  order?: number;
}) {
  try {
    const story = await db.therapyStory.create({
      data: {
        initials: data.initials,
        age: data.age,
        context: data.context,
        quote: data.quote,
        color: data.color,
        isVisible: data.isVisible !== undefined ? data.isVisible : true,
        order: data.order !== undefined ? data.order : 0,
      },
    });
    revalidatePath('/admin/stories');
    revalidatePath('/');
    return { success: true, data: story };
  } catch (error: any) {
    console.error('Error creating therapy story:', error);
    return { success: false, error: error.message || 'Failed to create therapy story' };
  }
}

export async function updateTherapyStory(
  id: number,
  data: {
    initials?: string;
    age?: string;
    context?: string;
    quote?: string;
    color?: string;
    isVisible?: boolean;
    order?: number;
  }
) {
  try {
    const story = await db.therapyStory.update({
      where: { id },
      data,
    });
    revalidatePath('/admin/stories');
    revalidatePath('/');
    return { success: true, data: story };
  } catch (error: any) {
    console.error('Error updating therapy story:', error);
    return { success: false, error: error.message || 'Failed to update therapy story' };
  }
}

export async function deleteTherapyStory(id: number) {
  try {
    const story = await db.therapyStory.delete({
      where: { id },
    });
    revalidatePath('/admin/stories');
    revalidatePath('/');
    return { success: true, data: story };
  } catch (error: any) {
    console.error('Error deleting therapy story:', error);
    return { success: false, error: error.message || 'Failed to delete therapy story' };
  }
}

export async function toggleTherapyStoryVisibility(id: number) {
  try {
    const story = await db.therapyStory.findUnique({
      where: { id },
      select: { isVisible: true },
    });

    if (!story) {
      return { success: false, error: 'Therapy story not found' };
    }

    const updated = await db.therapyStory.update({
      where: { id },
      data: { isVisible: !story.isVisible },
    });

    revalidatePath('/admin/stories');
    revalidatePath('/');
    return { success: true, data: updated };
  } catch (error: any) {
    console.error('Error toggling therapy story visibility:', error);
    return { success: false, error: error.message || 'Failed to toggle visibility' };
  }
}
