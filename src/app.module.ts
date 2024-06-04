import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ChatsModule } from './chats/chats.module';
import { MessageModule } from './messages/message.module';
import { GroupMessagesModule } from './group-messages/group-messages.module';
import { GroupsModule } from './groups/groups.module';
import { AuthGuard } from './auth/auth.guard';
import { MailingModule } from './mailing/mailing.module';
import { NotificationModule } from './notification/notification.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { BearHashingModule } from './utils/bearHashing/bear-hashing.module';
import { HomePageModule } from './home-page/home-page.module';

const THROTTLER_TTL = process.env.THROTTLER_TTL || 60000;
const THROTTLER_LIMIT = process.env.THROTTLER_LIMIT || 100;

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: Number(THROTTLER_TTL),
        limit: Number(THROTTLER_LIMIT),
      },
    ]),
    DevtoolsModule.register({
      http:
        String(process.env.NODE_ENV).toLowerCase() !== 'production' ||
        String(process.env.NODE_ENV).toLowerCase() !== 'prod',
      port: 8003,
    }),
    AuthModule,
    UsersModule,
    ChatsModule,
    MessageModule,
    GroupMessagesModule,
    GroupsModule,
    MailingModule,
    NotificationModule,
    BearHashingModule,
    HomePageModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
