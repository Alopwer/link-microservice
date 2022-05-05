import { Module } from "@nestjs/common";
import Redis from "ioredis";

@Module({
  providers: [
    {
      provide: 'REDIS_OPTIONS',
      useValue: {
        url: 'redis://localhost:6379'
      }
    },
    {
      inject: ['REDIS_OPTIONS'],
      provide: 'REDIS_CLIENT',
      useFactory: async (options: { url: string }) => {
        const client = new Redis();
        return client;
      }
    }
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}