import { Module } from '@nestjs/common';
import { PrivateChatsGateway } from './message.gateway';
import { CustomLoggerModule } from 'src/utils/customLogger/CustomLogger.module';
import { ChatsModule } from 'src/chats/chats.module';
import { AuthModule } from 'src/auth/auth.module';
import { ChatsService } from 'src/chats/chats.service';
import { PrismaService } from 'src/database/prisma.service';
import { MessageService } from './message.services';
import { MessagesGateway } from 'src/events/messages.gateway';

@Module({
  imports: [CustomLoggerModule, ChatsModule, AuthModule],
  providers: [
    PrivateChatsGateway,
    PrismaService,
    ChatsService,
    MessageService,
    MessagesGateway,
  ],
})
export class MessageModule {}
