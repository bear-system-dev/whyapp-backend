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
  @SubscribeMessage('getMessages')
  async onGetMessages(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    const mergedIds = data;
    console.log(mergedIds);
    const messages = await this.messageService.getMessages(mergedIds);
    client.emit('messages', messages);
  }
}
