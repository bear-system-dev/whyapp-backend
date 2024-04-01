import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GroupsService } from './groups.service';
import { corsOptions } from 'src/utils/cors.options';
import { GroupMessagesService } from 'src/group-messages/group-messages.service';

@WebSocketGateway({ cors: corsOptions, namespace: 'grupos' })
export class GroupsGateway {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly groupMessagesService: GroupMessagesService,
  ) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('load groups')
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
    @MessageBody() messageId: string,
  ) {
    if (!messageId)
      return client.emit('error', {
        mensagem: 'Você precisa fornecer o messageId',
      });
    const messageData = await this.groupMessagesService.getById(messageId);
    if (messageData instanceof Error)
      return client.emit('error', {
        mensagem: 'Erro ao buscar dados da mensagem',
      });
    client.broadcast
      .in(messageData.grupoId)
      .emit('newGroupMessage', messageData);
  }
}
