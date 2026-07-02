'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { hashPassword } from '@/lib/auth';

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
  professions?: string;
  quote?: string;
  quoteAuthor?: string;
  heroImage1?: string;
  heroImage2?: string;
  heroImage3?: string;
  aboutQuote?: string;
  aboutText1?: string;
  aboutText2?: string;
  aboutText3?: string;
  aboutText4?: string;
  aboutImage1?: string;
  aboutImage2?: string;
  therapyIntro?: string;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  linkedinUrl?: string | null;
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
    return { success: true, data: profile };
  } catch (error: any) {
    console.error('Error updating profile:', error);
    return { success: false, error: error.message || 'Failed to update profile' };
  }
}

export async function getAdminCredentials() {
  try {
    const user = await db.user.findFirst();
    if (!user) {
      throw new Error('Admin user not found');
    }
    return { email: user.email };
  } catch (error) {
    console.error('Error fetching admin credentials:', error);
    throw new Error('Failed to fetch credentials');
  }
}

export async function updateAdminCredentials(data: {
  email: string;
  password?: string;
}) {
  try {
    const user = await db.user.findFirst();
    if (!user) {
      return { success: false, error: 'Admin user not found' };
    }

    const updateData: any = {
      email: data.email,
    };

    if (data.password && data.password.trim() !== '') {
      updateData.password = await hashPassword(data.password);
    }

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: updateData,
    });

    revalidatePath('/admin/settings');
    return { success: true, data: { email: updatedUser.email } };
  } catch (error: any) {
    console.error('Error updating admin credentials:', error);
    return { success: false, error: error.message || 'Failed to update credentials' };
  }
}
