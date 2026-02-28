import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'src/generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasourceUrl: process.env.DATABASE_URL, // 🔥 REQUIRED in Prisma v7
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
