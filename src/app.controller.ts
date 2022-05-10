import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { GetDataByWorkspaceShareCodeMessage } from './message/getDataByWorkspaceShareCode.message';
import { GetWorkspaceShareCodeMessage } from './message/getWorkspaceShareCode.message';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get_workspace_share_code')
  async getWorkspaceShareCode(data: GetWorkspaceShareCodeMessage) {
    return this.appService.getWorkspaceShareCode(data);
  }

  @MessagePattern('get_data_by_workspace_share_code')
  async getDataByWorkspaceShareCode(data: GetDataByWorkspaceShareCodeMessage) {
    return this.appService.getDataByWorkspaceShareCode(data);
  }
}
