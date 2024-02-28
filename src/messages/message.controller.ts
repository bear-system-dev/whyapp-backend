import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessageService } from './message.services';

@WebSocketGateway()
export class MyGateway {
  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('newMessage')
  async onNewMessage(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.handshake.query.userId as string;
    const recipientId = client.handshake.query.recipientId as string;
    await this.messageService.processMessage(userId, recipientId, body);
  }
}
