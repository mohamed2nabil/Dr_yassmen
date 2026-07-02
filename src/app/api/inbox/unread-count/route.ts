import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET() {
  try {
    const unreadCount = await db.message.count({
      where: {
        isRead: false,
      },
    });

    return NextResponse.json({ unreadCount });
  } catch (error) {
    console.error('Failed to load unread message count:', error);
    return NextResponse.json({ unreadCount: 0 }, { status: 500 });
  }
}
