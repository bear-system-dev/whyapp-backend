import { Controller, Body, Post, Delete, Patch, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MessageService } from './message.services';
@ApiTags('private-chats')
@Controller('private-chats/messages')
export class PrivateChatsController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async getMessages(@Query('userId') userId: string, @Query('recipientId') recipientId: string) {
    const mergedIds = await this.messageService.mergeIds(userId, recipientId);
    const messages = await this.messageService.getMessages(mergedIds);
    console.log('Mensagem enviada para a sala: ', mergedIds);
    return { messages };
  }
  @Patch()
  async updateMessage(
    @Body()
    body: {
      userId: string;
      recipientId: string;
      messageId: string;
      newContent: string;
    },
  ) {
    const { userId, recipientId, messageId, newContent } = body;
    const mergedIds = await this.messageService.mergeIds(userId, recipientId);
    const updatedMessage = this.messageService.updateMessage(
      mergedIds,
      messageId,
      newContent,
    );
    return updatedMessage;
  }
  @Delete()
  async deleteMessage(
    @Body() body: { userId: string; recipientId: string; messageId: string },
  ) {
    const { userId, recipientId, messageId } = body;
    const mergedIds = await this.messageService.mergeIds(userId, recipientId);
    const deletedMessage = this.messageService.deleteMessage(
      mergedIds,
      messageId,
    );
    return deletedMessage;
  }
}
