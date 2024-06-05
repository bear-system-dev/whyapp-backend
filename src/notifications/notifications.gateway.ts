import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { NotificationsService } from './notifications.service';
import { UsersService } from 'src/users/users.service';
import { corsOptions } from 'src/utils/cors.options';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { OnlineUsers } from './entities/OnlineUsers';

@WebSocketGateway({ corsOptions: corsOptions, namespace: 'notifications' })
export class NotificationsGateway {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService,
  ) {}

  private readonly logger = new Logger(NotificationsGateway.name);
  private onlineUsers = new OnlineUsers();

  @WebSocketServer()
  server: Server;
  afterInit() {
    this.logger.debug('Up and running...');
  }
  handleConnection() {}
  handleDisconnect(client: Socket) {
    const onlineUser = this.onlineUsers.getOnlineUser(client.id);
    if (onlineUser !== (null || undefined))
      this.logger.debug('Disconected', {
        userId: onlineUser?.userId,
        isOnline: false,
        socketId: client.id,
      });
    return client.broadcast.emit('isOnline', {
      userId: onlineUser?.userId,
      isOnline: false,
    });
  }

  @SubscribeMessage('join private room')
  async onJoinPrivateRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() userId: string,
  ) {
    console.log(userId);

    const user = await this.usersService.userUnique({ id: userId });
    console.log(user);
    if (user instanceof Error) {
      console.log('Could not find this user by id');
      return client.emit('error', 'Could not find this user by id');
    }
    this.onlineUsers.setOnlineUser(userId, user.nome, client.id);

    client.broadcast.emit('isOnline', { userId, isOnline: true });

    return client.join(userId);
  }
}
