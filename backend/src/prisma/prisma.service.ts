import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { createPool } from "mysql2/promise";
import { PrismaMysql2 } from "@prisma/adapter-mysql2";
import * as dotenv from "dotenv";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    dotenv.config({ path: ".env", override: true });

    const connectionUrl = process.env.DATABASE_URL ?? "";
    if (!connectionUrl) {
      throw new Error("DATABASE_URL is empty");
    }

    const pool = createPool(connectionUrl);
    const adapter = new PrismaMysql2(pool);

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
