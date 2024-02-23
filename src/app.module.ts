import { Module } from '@nestjs/common';
import { HomePageController } from './home-page/home-page.controller';
import { HomePageService } from './home-page/home-page.service';
import { UserController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

const THROTTLER_TTL = process.env.THROTTLER_TTL || 60000;
const THROTTLER_LIMIT = process.env.THROTTLER_LIMIT || 100;

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ThrottlerModule.forRoot([
      {
        ttl: Number(THROTTLER_TTL),
        limit: Number(THROTTLER_LIMIT),
      },
    ]),
  ],
  controllers: [HomePageController, UserController],
  providers: [
    HomePageService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
