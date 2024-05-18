import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.services';
import { corsOptions } from 'src/utils/cors.options';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: 'private-chats', cors: corsOptions })
export class PrivateChatsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private readonly messageService: MessageService) {}

  private readonly logger = new Logger(PrivateChatsGateway.name);

  @WebSocketServer()
  private readonly server: Server;

  afterInit() {
    this.logger.debug('Up and running...');
    // instrument(this.server, {
    //   auth: {
    //     type: 'basic',
    //     username: process.env.SOCKETIO_ADMIN_UI_USERNAME || 'admin',
    //     password: process.env.SOCKETIO_ADMIN_UI_PASSWORD || 'admin2024',
    //   },
    //   mode: 'development',
    //   namespaceName: process.env.SOCKETIO_ADMIN_UI_NAMESPACE_NAME || '/admin',
    // });
  }

  handleConnection() {}
  handleDisconnect() {}

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
    console.log('Mensagem enviada para a sala: ', mergedIds);
    return client.to(mergedIds).emit('messages', messages);
  }

  @SubscribeMessage('join private')
  async onJoinPrivate(
    @ConnectedSocket() client: Socket,
    @MessageBody() mergedIds: string,
  ) {
    console.log('Cliente entrou na sala: ', mergedIds);
    return client.join(mergedIds);
  }

  @SubscribeMessage('leave private')
  async onLeavePrivate(
    @ConnectedSocket() client: Socket,
    @MessageBody() mergedIds: string,
  ) {
    console.log('Cliente saiu da sala: ', mergedIds);
    return client.leave(mergedIds);
  }
}
