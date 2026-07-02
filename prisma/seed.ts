import dotenv from 'dotenv';
dotenv.config();

import { db } from '../src/lib/db';
import bcrypt from 'bcryptjs';

async function main() {
  const email = 'admin@dryasmen.com';
  const password = 'adminpassword123';
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 1. Create default admin user
  const user = await db.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
    },
    create: {
      email,
      password: hashedPassword,
    },
  });

  console.log(`Created/Updated User: ${user.email}`);

  // 2. Create/Update Profile
  const profile = await db.profile.findFirst();
  const profileData = {
    name: 'Dr. Yassmin Allam',
    bio: 'Assistant Professor of Art Education & Certified Art Therapist.',
    contactEmail: 'info@dryassminallam.com',
    professions: 'Visual Artist | Interior Designer | Art Educator | Art Therapist',
    quote: 'Creativity is intelligence having fun.',
    quoteAuthor: 'Albert Einstein',
    heroImage1: 'https://images.unsplash.com/photo-1740710543611-80b658171bc3?w=600&h=800&fit=crop&auto=format',
    heroImage2: 'https://images.unsplash.com/photo-1646987916641-1f3c8992daa2?w=400&h=300&fit=crop&auto=format',
    heroImage3: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=400&h=300&fit=crop&auto=format',
    aboutQuote: 'Welcome to my creative world.',
    aboutText1: 'I am Yasmen Allam, a multidisciplinary creative professional with expertise in Visual Arts, Interior Design, Art Education, and Art Therapy. My work is driven by a passion for transforming ideas into meaningful artistic experiences that inspire creativity, personal growth, and emotional well-being.',
    aboutText2: 'With a background in Applied Arts and Education, I have developed a diverse portfolio that combines artistic expression, innovative design, and therapeutic practices. Throughout my journey, I have worked with children, adolescents, and adults, creating engaging learning environments, artistic projects, and art-based interventions that foster creativity and self-expression.',
    aboutText3: 'My philosophy is rooted in the belief that art has the power to connect, heal, educate, and inspire. Whether through a painting, a designed space, an educational program, or an art therapy session, my goal is to create experiences that leave a lasting impact.',
    aboutText4: 'This portfolio showcases selected works, projects, exhibitions, educational initiatives, and creative achievements that reflect my artistic vision and professional journey.',
    aboutImage1: 'https://images.unsplash.com/photo-1560831340-b9679dc9e9f0?w=500&h=400&fit=crop&auto=format',
    aboutImage2: 'https://images.unsplash.com/photo-1501366062246-723b4d3e4eb6?w=500&h=400&fit=crop&auto=format',
    therapyIntro: 'With over 12 years of clinical practice, I offer art therapy as a BAAT-accredited practitioner. My approach is trauma-informed, person-centered, and grounded in the belief that creativity is an innate human capacity for healing — not a talent that needs to be earned.\n\nSessions are conducted in Arabic and English. I work with adults, adolescents, and children in both individual and group settings.',
    instagramUrl: 'https://instagram.com',
    facebookUrl: 'https://facebook.com',
    linkedinUrl: 'https://linkedin.com'
  };

  if (profile) {
    await db.profile.update({
      where: { id: profile.id },
      data: profileData,
    });
  } else {
    await db.profile.create({
      data: profileData,
    });
  }

  console.log('Seeded Profile successfully!');

  // 3. Seed Credentials
  await db.credential.deleteMany();
  await db.credential.createMany({
    data: [
      { degree: 'Ph.D.', field: 'Fine Arts', institution: 'Cairo University', order: 1 },
      { degree: 'M.A.', field: 'Interior Design', institution: 'AUC', order: 2 },
      { degree: 'Cert.', field: 'Art Therapy', institution: 'BAAT Accredited', order: 3 },
    ]
  });
  console.log('Seeded Credentials successfully!');

  // 4. Seed Workshops
  await db.workshop.deleteMany();
  await db.workshop.createMany({
    data: [
      {
        title: 'Grief & Loss Processing',
        arabicTitle: 'تجاوز الحزن والفقدان',
        description: 'A structured 8-session program using collage, color, and mark-making to help participants navigate bereavement and loss.',
        sessions: '8 Sessions',
        format: 'Group / Individual',
        iconName: 'Heart',
        order: 1
      },
      {
        title: 'Trauma Recovery',
        arabicTitle: 'التعافي من الصدمات',
        description: 'Somatic-informed art therapy using clay, textile, and embodied drawing to support survivors of trauma in rebuilding safety.',
        sessions: '12 Sessions',
        format: 'Individual',
        iconName: 'Shield',
        order: 2
      },
      {
        title: 'Creative Self-Expression',
        arabicTitle: 'التعبير الإبداعي الذاتي',
        description: 'Open studio sessions for adults seeking greater self-awareness and emotional literacy through visual art and journaling.',
        sessions: 'Ongoing',
        format: 'Group',
        iconName: 'Sparkles',
        order: 3
      },
      {
        title: 'Children & Adolescents',
        arabicTitle: 'الأطفال والمراهقون',
        description: 'Developmentally attuned art therapy for children 6–18 years, addressing anxiety, school challenges, and family transitions.',
        sessions: 'Flexible',
        format: 'Individual / Family',
        iconName: 'Users',
        order: 4
      }
    ]
  });
  console.log('Seeded Workshops successfully!');

  // 5. Seed TherapyStories
  await db.therapyStory.deleteMany();
  await db.therapyStory.createMany({
    data: [
      {
        initials: 'S.M.',
        age: '34',
        context: 'Grief Processing',
        quote: "After losing my mother, I couldn't find words for what I felt. In Dr. Allam's sessions, I painted what I couldn't speak. Three months later, I understood myself in a way I never had before.",
        color: 'var(--chapter-therapy)',
        order: 1
      },
      {
        initials: 'A.K.',
        age: '16',
        context: 'Adolescent Anxiety',
        quote: "My son came in refusing to talk. He left the first session with a painting he was proud of. By session six, he was talking about things he'd never shared with anyone.",
        color: 'var(--chapter-education)',
        order: 2
      },
      {
        initials: 'N.R.',
        age: '41',
        context: 'Trauma Recovery',
        quote: "The clay work felt strange at first. But Dr. Allam held the space so gently. The process gave my body a way to say what my mind had been protecting me from.",
        color: 'var(--chapter-art)',
        order: 3
      }
    ]
  });
  console.log('Seeded Therapy Stories successfully!');

  // 6. Seed Stats if empty
  const countStats = await db.stat.count();
  if (countStats === 0) {
    await db.stat.createMany({
      data: [
        { value: '15+', label: 'Years of Practice' },
        { value: '1200+', label: 'Students Taught' },
        { value: '87', label: 'Interior Projects' },
        { value: '340+', label: 'Therapy Clients' },
        { value: '60+', label: 'Workshops' },
        { value: '8', label: 'Countries Reached' },
      ]
    });
    console.log('Seeded Stats successfully!');
  }

  console.log('All seed operations completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
    process.exit(0);
  });
