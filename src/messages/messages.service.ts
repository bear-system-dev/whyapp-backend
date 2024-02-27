import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CustomLogger } from 'src/utils/customLogger/customLogger.service';
import { PrivateMessageDTO } from './dto/PrivateMessageDTO';
import { ChatsService } from 'src/chats/chats.service';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    private chatsService: ChatsService,
    private logService: CustomLogger,
  ) {}

  async createPrivateMessage(privateMessageDTO: PrivateMessageDTO) {
    const { mensagem, fromUserId, toUserId, toUserName } = privateMessageDTO;
    try {
      const foundChat = await this.chatsService.findNameByUserId(
        toUserName,
        fromUserId,
      );
      if (foundChat) {
        this.logService.log(foundChat);
      }
      this.logService.log({
        message: 'Chat não encontrado, criando...',
        foundChat,
      });
      const newChat = await this.chatsService.createChat({
        nome: toUserName,
        usuarioId: fromUserId,
      });
      if (newChat instanceof Error)
        return new Error('Erro ao criar chat com mensagem');
      const newChatWithMessage = await this.createMessageInChatById(
        { fromUserId, mensagem, toUserId, toUserName },
        newChat.id,
      );
      if (newChatWithMessage instanceof Error)
        return new Error(newChatWithMessage.message);
      return newChatWithMessage;
    } catch (error) {
      const msg: string = 'Erro ao criar messagem';
      this.logService.log({
        message: msg,
        error,
      });
      return new Error(msg);
    }
  }

  async createMessageInChatById(data: PrivateMessageDTO, chatId: string) {
    try {
      const newChat = await this.prisma.chat.update({
        where: {
          id: chatId,
        },
        data: {
          mensagens: {
            create: data,
          },
        },
      });
      return newChat;
    } catch (error) {
      const msg: string = 'Erro ao criar chat pelo ID';
      console.log(error);
      this.logService.log({
        message: msg,
        error,
      });
      return new Error(msg);
    }
  }
}
