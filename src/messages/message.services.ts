import { Injectable } from '@nestjs/common';
import { Chat, ChatMessage, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { chatDto } from './dto/chat.dto';
import { newMessageDTO } from './dto/newMessage.dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async processMessage(
    userId: string,
    recipientId: string,
    message: string,
  ): Promise<any> {
    try {
      const sender = await this.findUserById(userId);
      const recipient = await this.findUserById(recipientId);

      if (userId === recipientId) {
        throw new Error('O id do remetente e do destinatário são iguais.');
      }

      if (sender && recipient) {
        const mergedIds = await this.mergeIds(userId, recipientId);
        let chatId = await this.findChatId(mergedIds);

        if (!chatId) {
          const chatData = {
            nome: sender.nome,
            usuarioId: userId,
            chatId: mergedIds,
          };
          const newChat = await this.createNewChat(chatData);
          chatId = newChat.id;
        }

        const newMessageData = {
          mensagem: message,
          chatId: chatId,
          fromUserId: userId,
          toUserId: recipientId,
        };
        const newMessage = await this.createNewMessage(newMessageData);

        return newMessage;
      } else {
        console.log('Sender or recipient not found.');
      }
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao processar a mensagem');
    }
  }

  private async findUserById(userId: string): Promise<User | null> {
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

  private async findChatId(mergedIds: string): Promise<string | null> {
    try {
      const chat = await this.prisma.chat.findFirst({
        where: { chatId: mergedIds },
      });
      return chat ? chat.id : null;
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao procurar o chat');
    }
  }

  private async createNewChat(chatData: chatDto): Promise<Chat> {
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

  private async createNewMessage(
    newMessageData: newMessageDTO,
  ): Promise<ChatMessage> {
    try {
      const newMessage = await this.prisma.chatMessage.create({
        data: newMessageData,
      });
      return newMessage;
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao criar a mensagem');
    }
  }
  async getMessages(mergedIds: string): Promise<ChatMessage[]> {
    try {
      const chatId = await this.findChatId(mergedIds);
      const findChatMessages = await this.prisma.chatMessage.findMany({
        where: { chatId: chatId },
      });
      console.log(findChatMessages);
      return findChatMessages;
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      throw error;
    }
  }
  async mergeIds(id1: string, id2: string): Promise<string> {
    try {
      const sortByFirst = [id1, id2].sort();
      const joinedIds = sortByFirst.join('');
      return joinedIds;
    } catch (error) {
      console.error('Error merging IDs:', error);
      throw error;
    }
  }
  async updateMessage(
    mergedIds: string,
    messageId: string,
    newContent: string,
  ): Promise<ChatMessage> {
    try {
      const updatedMessage = await this.prisma.chatMessage.update({
        where: {
          id: messageId,
        },
        data: {
          mensagem: newContent,
          updatedAt: new Date(),
        },
      });

      return updatedMessage;
    } catch (error) {
      console.error('Error updating message:', error);
      throw error;
    }
  }
  async deleteMessage(
    mergedIds: string,
    messageId: string,
  ): Promise<ChatMessage> {
    try {
      const deleteMessage = await this.prisma.chatMessage.update({
        where: {
          id: messageId,
        },
        data: {
          mensagem: '<i>Esta mensagem foi apagada.</i>',
          updatedAt: new Date(),
        },
      });

      return deleteMessage;
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  }
}
