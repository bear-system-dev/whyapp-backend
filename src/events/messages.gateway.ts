import { Server } from 'socket.io';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { corsOptions } from 'src/utils/cors.options';

// interface Interface {
//   body: {
//     messagem: string;
//   };
//   params: {
//     usuarioId: string;
//   };
//   queries: {
//     fromUserId: string;
//     toUserId: string;
//   };
// }

@WebSocketGateway({ cors: corsOptions, namespace: 'messages' })
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('event')
  salvaMensagem(@MessageBody() data) {
    console.log(data.body.messagem);
    this.server.on('mensagem', data);
  }
}
