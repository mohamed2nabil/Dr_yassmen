'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getMessages() {
  try {
    return await db.message.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw new Error('Failed to fetch messages');
  }
}

export async function getMessage(id: number) {
  try {
    return await db.message.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error fetching message:', error);
    throw new Error('Failed to fetch message');
  }
}

export async function createMessage(data: {
  name: string;
  email: string;
  phone?: string;
  interests?: string;
  message: string;
}) {
  try {
    const newMessage = await db.message.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        interests: data.interests || null,
        message: data.message,
      },
    });
    revalidatePath('/admin/inbox');
    
    const result = { success: true as const, data: newMessage };
    return Object.assign(result, newMessage);
  } catch (error: any) {
    console.error('Error creating message:', error);
    return { success: false as const, error: error.message || 'Failed to send message' };
  }
}

export async function markMessageAsRead(id: number) {
  try {
    const message = await db.message.update({
      where: { id },
      data: { isRead: true },
    });
    revalidatePath('/admin/inbox');
    
    const result = { success: true as const, data: message };
    return Object.assign(result, message);
  } catch (error: any) {
    console.error('Error marking message as read:', error);
    return { success: false as const, error: error.message || 'Failed to mark message as read' };
  }
}

export async function deleteMessage(id: number) {
  try {
    const message = await db.message.delete({
      where: { id },
    });
    revalidatePath('/admin/inbox');
    
    const result = { success: true as const, data: message };
    return Object.assign(result, message);
  } catch (error: any) {
    console.error('Error deleting message:', error);
    return { success: false as const, error: error.message || 'Failed to delete message' };
  }
}

function parseMessageRole(interests?: string | null) {
  if (!interests) {
    return 'Client';
  }

  try {
    const parsed = interests.startsWith('[') ? JSON.parse(interests) : interests.split(',');
    const firstRole = Array.isArray(parsed) ? String(parsed[0]) : String(parsed);
    return firstRole.trim() || 'Client';
  } catch (error) {
    return interests.split(',')[0]?.trim() || 'Client';
  }
}

export async function createTestimonialFromMessage(messageId: number) {
  try {
    const message = await db.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      return { success: false as const, error: 'Message not found' };
    }

    const testimonial = await db.testimonial.create({
      data: {
        clientName: message.name,
        content: message.message,
        role: parseMessageRole(message.interests),
      },
    });

    await db.message.update({
      where: { id: messageId },
      data: { isRead: true },
    });

    revalidatePath('/admin/inbox');
    revalidatePath('/admin/vouts');
    revalidatePath('/');

    const result = { success: true as const, data: testimonial };
    return Object.assign(result, testimonial);
  } catch (error: any) {
    console.error('Error converting message to testimonial:', error);
    return { success: false as const, error: error.message || 'Failed to add message to vouts' };
  }
}
