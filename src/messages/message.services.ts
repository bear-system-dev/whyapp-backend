import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async processMessage(
    userId: string,
    recipientId: string,
    message: any,
  ): Promise<void> {
    try {
      const sender = await this.findUserById(userId);
      const recipient = await this.findUserById(recipientId);

      if (sender && recipient) {
        const chatData = {
          nome: sender.nome,
          destinatarioId: recipientId,
          usuarioId: userId,
        };
        const chatId = await this.findChatId(userId, recipientId);
        console.log(
          `Processing message from user ${sender.nome} to recipient ${recipient.nome}:`,
          message,
        );

        if (chatId) {
          const newMessage = await this.createNewMessage(message, chatId);
          return newMessage;
        }

        const newChat = await this.createNewChat(chatData);
        console.log(newChat);
      } else {
        console.log('Sender or recipient not found.');
      }
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao processar a mensagem');
    }
  }

  private async findUserById(userId: string): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao procurar o usuário');
    }
  }

  private async findChatId(
    userId: string,
    recipientId: string,
  ): Promise<string | null> {
    try {
      const chat = await this.prisma.chat.findFirst({
        where: { destinatarioId: recipientId, usuarioId: userId },
      });
      return chat ? chat.id : null;
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao procurar o chat');
    }
  }

  async createNewChat(chatData): Promise<any> {
    console.log(chatData);

    try {
      const newChat = await this.prisma.chat.create({
        data: chatData,
      });
      return newChat;
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao criar o chat');
    }
  }

  async createNewMessage(message, chatId): Promise<any> {
    console.log(message);

    try {
      const newMessage = await this.prisma.chatMessage.create({
        data: {
          ...message,
          chat: { connect: { id: chatId } },
        },
      });
      console.log(newMessage);
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao criar a mensagem');
    }
  }
}
