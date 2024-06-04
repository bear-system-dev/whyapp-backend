import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [NotificationGateway],
})
export class NotificationModule {}
