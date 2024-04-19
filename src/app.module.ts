import { Module } from '@nestjs/common';
import { HomePageController } from './home-page/home-page.controller';
import { HomePageService } from './home-page/home-page.service';
import { UserController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ChatsService } from './chats/chats.service';
import { ChatsModule } from './chats/chats.module';
import { MessageModule } from './messages/message.module';
import { GroupMessagesModule } from './group-messages/group-messages.module';
import { GroupsModule } from './groups/groups.module';
import { MailingService } from './mailing/mailer.service';
import { MailingModule } from './mailing/mailing.module';

const THROTTLER_TTL = process.env.THROTTLER_TTL || 60000;
const THROTTLER_LIMIT = process.env.THROTTLER_LIMIT || 100;

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ChatsModule,
    ThrottlerModule.forRoot([
      {
        ttl: Number(THROTTLER_TTL),
        limit: Number(THROTTLER_LIMIT),
      },
    ]),
    MessageModule,
    GroupMessagesModule,
    GroupsModule,
    MailingModule,
  ],
  controllers: [HomePageController, UserController],
  providers: [
    HomePageService,
    ChatsService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    MailingService,
  ],
})
export class AppModule {}
