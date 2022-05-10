import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import Redis from 'ioredis';
import { GetWorkspaceShareCodeMessage } from './message/getWorkspaceShareCode.message';
import { randomBytes } from 'crypto';
import { GetDataByWorkspaceShareCodeMessage } from './message/getDataByWorkspaceShareCode.message';

@Injectable()
export class AppService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis
  ) {}

  async getWorkspaceShareCode(data: GetWorkspaceShareCodeMessage) {
    let workspaceShareCode = await this.redis.get(`${data.requesterId}:${data.workspaceId}`);
    if (!workspaceShareCode) {
      workspaceShareCode = await this.createWorkspaceShareCode(data);
    }
    return workspaceShareCode;
  }

  async getDataByWorkspaceShareCode(data: GetDataByWorkspaceShareCodeMessage) {
    let workspaceData = await this.redis.get(data.workspaceShareCode);
    if (!workspaceData) {
      throw new NotFoundException();
    }
    const [requesterId, workspaceId] = workspaceData.split(':')
    return { requesterId, workspaceId };
  }

  async createWorkspaceShareCode(data: GetWorkspaceShareCodeMessage) {
    const workspaceShareCode = randomBytes(16).toString('hex');
    await this.redis.mset(
      `${data.requesterId}:${data.workspaceId}`,
      workspaceShareCode,
      workspaceShareCode,
      `${data.requesterId}:${data.workspaceId}`
    );
    await this.redis.expire(`${data.requesterId}:${data.workspaceId}`, 120);
    await this.redis.expire(workspaceShareCode, 120);
    return workspaceShareCode;
  }
}
