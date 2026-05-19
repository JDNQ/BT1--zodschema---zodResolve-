import type { PrismaClientOptions } from "@prisma/client/runtime";
import { PrismaClient } from "@prisma/client";

const config: PrismaClientOptions = {
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
};

export function createPrismaClient() {
  return new PrismaClient(config);
}
