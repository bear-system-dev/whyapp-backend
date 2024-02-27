import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CustomLoggerModule } from 'src/utils/customLogger/CustomLogger.module';
import { ChatsModule } from 'src/chats/chats.module';
import { ChatsService } from 'src/chats/chats.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [CustomLoggerModule, ChatsModule, AuthModule],
  controllers: [MessagesController],
  providers: [MessagesService, PrismaService, ChatsService],
})
export class MessagesModule {}
