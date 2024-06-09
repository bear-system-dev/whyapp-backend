import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/database/prisma.service';
import { NotificationsController } from './notifications.controller';

@Module({
  imports: [UsersModule],
  providers: [NotificationsGateway, NotificationsService, PrismaService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
