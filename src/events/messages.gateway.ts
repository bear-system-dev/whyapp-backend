import { Server } from 'socket.io';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { corsOptions } from 'src/utils/cors.options';
import { Socket } from 'dgram';

@WebSocketGateway({ cors: corsOptions, namespace: 'messages' })
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  private userSockets: Map<string, Socket> = new Map();

  //NOTIFICATION
  public async notifyRecipient(recipientId: string, message: any) {
    try {
      const recipientSocket = this.findUserSocket(recipientId);

      if (recipientSocket !== undefined) {
        recipientSocket.emit('newMessage', message);
        return {
          success: true,
          message: 'Mensagem enviada com sucesso.',
        };
      } else {
        console.warn('Socket do destinatário não encontrado.');
        return {
          success: false,
          message: 'Socket do destinatário não encontrado.',
        };
      }
    } catch (error) {
      console.error('Erro ao enviar notificação ao destinatário.', error);
      return {
        success: false,
        message: 'Erro ao enviar notificação ao destinatário.',
      };
    }
  }

  @SubscribeMessage('event')
  salvaMensagem(@MessageBody() data) {
    console.log(data.body.messagem);
    this.server.on('mensagem', data);
  }

  //NOTIFICATION
  private findUserSocket(userId: string): Socket | undefined {
    if (this.userSockets.has(userId)) {
      return this.userSockets.get(userId);
    }
    return undefined;
  }
}
