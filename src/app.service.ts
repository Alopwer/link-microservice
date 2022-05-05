import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { GetWorkspaceShareCodeMessage } from './message/getWorkspaceShareCode.message';

@Injectable()
export class AppService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis
  ) {}

  async createWorkspaceShareCode(data: GetWorkspaceShareCodeMessage) {
    await this.redis.set(data.workspaceId, 'testing encoded')
    return this.redis.get(data.workspaceId);
  }
}
