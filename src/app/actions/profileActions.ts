'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getProfile() {
  try {
    let profile = await db.profile.findFirst();
    if (!profile) {
      profile = await db.profile.create({
        data: {
          name: 'Dr. Yassmin Allam',
          bio: 'Assistant Professor of Art Education & Certified Art Therapist.',
          contactEmail: 'info@dryassminallam.com',
        },
      });
    }
    return profile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw new Error('Failed to fetch profile');
  }
}

export async function updateProfile(data: {
  name: string;
  bio: string;
  contactEmail: string;
}) {
  try {
    let profile = await db.profile.findFirst();
    if (profile) {
      profile = await db.profile.update({
        where: { id: profile.id },
        data,
      });
    } else {
      profile = await db.profile.create({
        data,
      });
    }
    revalidatePath('/admin/settings');
    revalidatePath('/');
    return profile;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile');
  }
}
