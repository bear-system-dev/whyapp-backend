import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessageService } from './message.services';
import { corsOptions } from 'src/utils/cors.options';

@WebSocketGateway({ cors: corsOptions })
export class MyGateway {
  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('newMessage')
  async onNewMessage(
    @MessageBody() body: string,
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.handshake.query.userId as string;
    const recipientId = client.handshake.query.recipientId as string;
    const message = await this.messageService.processMessage(
      userId,
      recipientId,
      body,
    );
    const mergedIds = await this.messageService.mergeIds(userId, recipientId);
    return client.to(mergedIds).emit('newMessage', message);
  }

  @SubscribeMessage('getMessages')
  async onGetMessages(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    const mergedIds = data;
    const messages = await this.messageService.getMessages(mergedIds);
    return client.to(mergedIds).emit('messages', messages);
  }

  @SubscribeMessage('join private')
  async onJoinPrivate(
    @ConnectedSocket() client: Socket,
    @MessageBody() mergedIds: string,
  ) {
    client.join(mergedIds);
  }

  @SubscribeMessage('leave private')
  async onLeavePrivate(
    @ConnectedSocket() client: Socket,
    @MessageBody() mergedIds: string,
  ) {
    client.leave(mergedIds);
  }
}
