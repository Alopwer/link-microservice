export class GetWorkspaceShareCodeMessage {
  constructor(
    public readonly workspaceId: string,
    public readonly requesterId: string
  ) {}
}