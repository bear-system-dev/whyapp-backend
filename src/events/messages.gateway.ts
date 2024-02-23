import { Server } from 'socket.io';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { corsOptions } from 'src/utils/cors.options';

@WebSocketGateway({ cors: corsOptions, namespace: 'messages' })
export class MessagesGateway {
  @WebSocketServer()
  server: Server;
}
