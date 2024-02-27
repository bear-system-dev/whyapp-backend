import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ChatCreateDTO } from './dto/ChatCreateDTO';
import { CustomLogger } from 'src/utils/customLogger/customLogger.service';

const chatDataIncludes = {
  mensagens: true,
  imagens: true,
  videos: true,
  audios: true,
  documentos: true,
};

@Injectable()
export class ChatsService {
  constructor(
    private prisma: PrismaService,
    private logService: CustomLogger,
  ) {}
  async createChat(chatCreateDTO: ChatCreateDTO) {
    try {
      const chat = await this.prisma.user.update({
        where: {
          id: chatCreateDTO.usuarioId,
        },
        data: {
          chats: {
            create: {
              nome: chatCreateDTO.nome,
            },
          },
        },
      });
      return chat;
    } catch (error) {
      this.logService.log({ message: 'Erro ao criar chat', error });
      console.log(error);
      return new Error('Erro ao criar chat');
    }
  }

  async findNameByUserId(nome: string, usuarioId: string) {
    try {
      const chatNameByUserId = await this.prisma.chat.findFirst({
        where: {
          AND: {
            nome,
            usuarioId,
          },
        },
        select: chatDataIncludes,
      });
      return chatNameByUserId;
    } catch (error) {
      const msg: string = 'Erro ao procurar o nome do chat pelo id do usuário';
      this.logService.log({
        message: msg,
        error,
      });
      return new Error(msg);
    }
  }
}
