'use server';

import { db } from '@/lib/db';

export async function getViews() {
  try {
    let analytics = await db.analytics.findFirst();
    if (!analytics) {
      analytics = await db.analytics.create({
        data: { views: 0 },
      });
    }
    return analytics.views;
  } catch (error) {
    console.error('Error getting views:', error);
    return 0;
  }
}

export async function incrementViews() {
  try {
    let analytics = await db.analytics.findFirst();
    if (!analytics) {
      analytics = await db.analytics.create({
        data: { views: 1 },
      });
    } else {
      analytics = await db.analytics.update({
        where: { id: analytics.id },
        data: { views: analytics.views + 1 },
      });
    }
    return analytics.views;
  } catch (error) {
    console.error('Error incrementing views:', error);
    return 0;
  }
}
