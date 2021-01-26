import { PrismaClient } from '@prisma/client';

let prisma = null;

export default function getPrismaClient() {
  if (prisma) {
    return prisma;
  }
  prisma = new PrismaClient();
  return prisma;
}
