import { PrismaClient } from '../generated/prisma';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const urlString = process.env.DATABASE_URL || 'mysql://root:@localhost:3306/dr_yasmen_db';
const adapter = new PrismaMariaDb(urlString);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
