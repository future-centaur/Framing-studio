import { PrismaClient } from '@prisma/client';

// Singleton pattern for Prisma client — prevents connection pool exhaustion
// in Next.js hot-reload dev environment
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

const db = globalThis.__prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = db;
}

export { db };
