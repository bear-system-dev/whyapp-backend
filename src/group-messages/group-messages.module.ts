import { Module } from '@nestjs/common';
import { GroupMessagesService } from './group-messages.service';
import { GroupMessagesController } from './group-messages.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [GroupMessagesController],
  providers: [GroupMessagesService, PrismaService],
})
export class GroupMessagesModule {}
