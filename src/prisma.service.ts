import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleDestroy() {
    try {
      await this.$disconnect();
    } catch (error) {
      console.log({
        message: 'Error disconnecting from the database',
        error: error.message,
      });
    }
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      console.log({
        message: 'Error connecting to the database',
        error: error.message,
      });
    }
  }
}
