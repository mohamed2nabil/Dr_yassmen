import dotenv from 'dotenv';
dotenv.config();

import { db } from '../src/lib/db';
import bcrypt from 'bcryptjs';

async function main() {
  const email = 'admin@dryasmen.com';
  const password = 'adminpassword123';
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

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

  console.log('Seed completed successfully! Created/Updated user:');
  console.log(`Email: ${user.email}`);
  console.log(`Password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // In Prisma 7, disconnect is called on the client.
    // The driver adapter might hold connections open in the pool.
    // We can call db.$disconnect() to close it.
    await db.$disconnect();
    // Since we're using a raw mariadb pool in db.ts, we might need to force exit
    // if the pool doesn't close immediately.
    process.exit(0);
  });
