import { Module } from '@nestjs/common';
import { MyGateway } from './message.controller'; // Assuming 'gateway.controller.ts' is your WebSocket gateway file
import { CustomLoggerModule } from 'src/utils/customLogger/CustomLogger.module';
import { ChatsModule } from 'src/chats/chats.module';
import { AuthModule } from 'src/auth/auth.module';
import { ChatsService } from 'src/chats/chats.service';
import { PrismaService } from 'src/database/prisma.service'; /* 
import { MessagesController } from 'src/messages/messages.controller'; */
import { MessageService } from './message.services';

@Module({
  imports: [CustomLoggerModule, ChatsModule, AuthModule], // Import other modules if needed
  /*   controllers: [MessagesController], */
  providers: [MyGateway, PrismaService, ChatsService, MessageService], // Include MyGateway in providers
})
export class MessageModule {}
