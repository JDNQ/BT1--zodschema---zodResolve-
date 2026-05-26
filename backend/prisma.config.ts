import { defineConfig } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  earlyAccess: true,
  schema: "./prisma/schema.prisma",
  migrate: {
    async adapter() {
      const { createPool } = await import("mysql2/promise");
      const pool = createPool(process.env.DATABASE_URL!);
      const { PrismaMysql2 } = await import("@prisma/adapter-mysql2");
      return new PrismaMysql2(pool);
    },
  },
});
