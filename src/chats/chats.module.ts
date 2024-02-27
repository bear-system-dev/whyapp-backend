import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CustomLoggerModule } from 'src/utils/customLogger/CustomLogger.module';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [CustomLoggerModule],
  providers: [ChatsService, PrismaService],
  exports: [CustomLoggerModule],
})
export class ChatsModule {}
