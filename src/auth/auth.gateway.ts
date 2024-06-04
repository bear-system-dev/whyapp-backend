import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { corsOptions } from 'src/utils/cors.options';

@WebSocketGateway({ cors: corsOptions, namespace: 'auth' })
export class AuthGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor() {}

  private readonly logger = new Logger(AuthGateway.name);

  @WebSocketServer()
  private readonly server: Server;

  afterInit() {
    this.logger.debug('Up and running...');
  }
  handleConnection() {}
  handleDisconnect() {}

  @SubscribeMessage('')
  handleMessage(@ConnectedSocket() client: Server): Server {
    return client;
  }
}
