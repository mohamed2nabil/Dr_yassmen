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
