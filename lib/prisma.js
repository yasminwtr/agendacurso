import { PrismaClient } from '@prisma/client'

// PrismaClient é anexado ao objeto global em desenvolvimento para prevenir
// o esgotamento do limite de conexões ao banco de dados.
//
// Saiba mais:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global.prisma || null;

export const prisma =
  globalForPrisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
