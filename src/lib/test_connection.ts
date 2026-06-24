import { PrismaClient } from '../generated/prisma';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const urlString = process.env.DATABASE_URL || 'mysql://root:@localhost:3306/dr_yasmen_db';
console.log('Testing with connection URL:', urlString);

try {
  const adapter = new PrismaMariaDb(urlString);
  const prisma = new PrismaClient({ adapter });
  
  prisma.user.findFirst()
    .then((res) => {
      console.log('Successfully connected and queried user table! Result:', res);
      prisma.$disconnect().then(() => process.exit(0));
    })
    .catch((err) => {
      console.error('Query failed:', err);
      process.exit(1);
    });
} catch (e) {
  console.error('Initialization failed:', e);
  process.exit(1);
}
