import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { GetWorkspaceShareCodeMessage } from './message/getWorkspaceShareCode.message';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get_workspace_share_code')
  async getWorkspaceShareCode(data: GetWorkspaceShareCodeMessage) {
    return this.appService.createWorkspaceShareCode(data);
  }
}
