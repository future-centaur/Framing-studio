import { PrismaClient } from '@prisma/client';

// Singleton pattern for Prisma client — prevents connection pool exhaustion
// in Next.js hot-reload dev environment
declare global {
  // eslint-disable-next-line no-var
  var __prisma: any;
}

function createPrismaClient() {
  const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

  return prisma.$extends({
    query: {
      $allOperations: async ({ operation, model, args, query }) => {
        try {
          return await query(args);
        } catch (error: any) {
          // Detect connection reset / closed server errors (Neon auto-suspend P1017, P1001, etc.)
          const isConnectionError =
            error?.code === 'P1017' ||
            error?.code === 'P1001' ||
            error?.code === 'P1002' ||
            error?.code === 'P1008' ||
            (typeof error?.message === 'string' && (
              error.message.includes('Server has closed the connection') ||
              error.message.includes('ConnectionReset') ||
              error.message.includes('10054') ||
              error.message.includes('forcibly closed')
            ));

          if (isConnectionError) {
            console.warn(`[Prisma] Connection reset detected (${error?.code ?? 'ConnectionReset'}). Re-establishing connection and retrying query...`);
            await prisma.$disconnect().catch(() => {});
            await prisma.$connect().catch(() => {});

            if (model) {
              const modelKey = model.charAt(0).toLowerCase() + model.slice(1);
              const target = (prisma as any)[modelKey];
              if (target && typeof target[operation] === 'function') {
                return await target[operation](args);
              }
            } else if (typeof (prisma as any)[operation] === 'function') {
              return await (prisma as any)[operation](args);
            }
          }
          throw error;
        }
      },
    },
  });
}

const db = (globalThis.__prisma ?? createPrismaClient()) as ReturnType<typeof createPrismaClient>;

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = db;
}

export { db };
