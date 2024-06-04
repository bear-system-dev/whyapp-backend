import { Module } from '@nestjs/common';
import { GroupMessagesService } from './group-messages.service';
import { GroupMessagesController } from './group-messages.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { NotificationGateway } from 'src/notification/notification.gateway';

@Module({
  imports: [AuthModule, NotificationGateway],
  controllers: [GroupMessagesController],
  providers: [GroupMessagesService, PrismaService, NotificationGateway],
})
export class GroupMessagesModule {}
