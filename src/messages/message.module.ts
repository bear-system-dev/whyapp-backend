import { Module } from '@nestjs/common';
import { PrivateChatsGateway } from './message.gateway';
import { CustomLoggerModule } from 'src/utils/customLogger/CustomLogger.module';
import { ChatsModule } from 'src/chats/chats.module';
import { AuthModule } from 'src/auth/auth.module';
import { ChatsService } from 'src/chats/chats.service';
import { PrismaService } from 'src/database/prisma.service';
import { MessageService } from './message.services';
import { PrivateChatsController } from './message.controller';

@Module({
  imports: [CustomLoggerModule, ChatsModule, AuthModule],
  controllers: [PrivateChatsController],
  providers: [PrivateChatsGateway, PrismaService, ChatsService, MessageService],
})
export class MessageModule {}
