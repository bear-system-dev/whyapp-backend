import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { GroupsService } from './groups.service';
import { corsOptions } from 'src/utils/cors.options';
import { GroupMessagesService } from 'src/group-messages/group-messages.service';
import { Logger } from '@nestjs/common';
// import { instrument } from '@socket.io/admin-ui';

@WebSocketGateway({ cors: corsOptions, namespace: 'group-chats' })
export class GroupsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(
    private readonly groupsService: GroupsService,
    private readonly groupMessagesService: GroupMessagesService,
  ) {}

  private readonly logger = new Logger(GroupsGateway.name);

  @WebSocketServer()
  io: Namespace;

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

  @SubscribeMessage('load groups') //ideia inicial, não usado
  async onLoadGroups(
    @ConnectedSocket() client: Socket,
    @MessageBody() userId: string,
  ) {
    if (!userId)
      return client.emit('error', {
        mensagem: 'Você precisa fornecer o userId',
      });

    const userGroups = await this.groupsService.getAllByUserId(userId);
    if (userGroups instanceof Error)
      return client.emit('error', { mensagem: userGroups.message });

    userGroups.forEach((userGroup) => {
      console.log(`UserId: ${userId} || Joined Group: ${userGroup.grupo.id}`);
      client.join(userGroup.grupo.id);
    });
    return client.emit('load groups', userGroups);
  }

  @SubscribeMessage('join group')
  async onJoinGroup(
    @ConnectedSocket() client: Socket,
    @MessageBody() groupId: string,
  ) {
    if (!groupId)
      return client.emit('error', {
        mensagem: 'Você precisa fornecer o groupId',
      });
    return client.join(groupId);
  }

  @SubscribeMessage('leave group')
  async onLeaveGroup(
    @ConnectedSocket() client: Socket,
    @MessageBody() groupId: string,
  ) {
    if (!groupId)
      return client.emit('error', {
        mensagem: 'Você precisa fornecer o groupId',
      });
    return client.leave(groupId);
  }

  /* A PARTE ABAIXO ERA PARA SER UM GATEWAY DE group-messages COM NAMESPACE group-messages
   * DEIXAREI ASSIM PARA SIMPLIFICAR PRO FRONT END. UTILIZARÃO OS EVENTOS TODOS DESTE MESMO NAMESPACE grupos
   */

  @SubscribeMessage('newGroupMessage')
  async onNewGroupMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      messageId: string;
      userId: string;
      recipientsId: Array<string>;
    },
  ) {
    const { messageId, recipientsId, userId } = data;

    if (!messageId)
      return client.emit('error', {
        mensagem: 'Você precisa fornecer o messageId',
      });
    const messageData = await this.groupMessagesService.getById(messageId);
    if (messageData instanceof Error)
      return client.emit('error', {
        mensagem: 'Erro ao buscar dados da mensagem',
      });

    for (const recipientId in recipientsId) {
      this.logger.debug(`Emitindo evento NOTIFICATION para: ${recipientId}`);
      this.io.server.of('/notifications').to(recipientId).emit('notification', {
        context: 'group-chats_newGroupMessage',
        contextMessage: 'Nova mensagem de grupo',
        from: userId,
        to: recipientId,
        data: messageData,
      });
    }

    return client.broadcast
      .in(messageData.grupoId)
      .emit('newGroupMessage', messageData);
  }
}
