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

    this.changeIsOnlineOnUsersModel(onlineUser.userId, false); //Muda no banco de dados

    return client.broadcast.emit('isOnline', {
      onlineUser,
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
    if (user instanceof Error) {
      console.log('Could not find this user by id');
      return client.emit('error', 'Could not find this user by id');
    }

    this.onlineUsers.setOnlineUser(userId, user.nome, client.id);
    const onlineUser = this.onlineUsers.getOnlineUser(client.id); //O return da função setOnlineUser() não funcionar, por isso tal utilização

    this.changeIsOnlineOnUsersModel(userId, true);

    client.broadcast.emit('isOnline', { onlineUser, isOnline: true }); //Muda no banco de dados

    return client.join(userId);
  }

  private async changeIsOnlineOnUsersModel(userId: string, isOnline: boolean) {
    try {
      const user = await this.usersService.userUnique({ id: userId });
      if (user instanceof Error) throw new Error(user.message);
      if (!user || user === undefined) throw new Error(`Usuário não existe`);

      const updatedUser = await this.usersService.updateIsOnlineByUserUnique(
        { id: userId },
        isOnline,
      );
      if (updatedUser instanceof Error) throw new Error(updatedUser.message);

      this.logger.debug(
        `Usuário atualizado: isOnline --> ${updatedUser.isOnline}`,
      );
    } catch (err) {
      this.logger.error(`${err}`);
    }
  }

  public async getDynamicOnlineUsers() {
    return this.onlineUsers.getAll();
  }
}
