import { Module } from '@nestjs/common';
import { HomePageController } from './home-page/home-page.controller';
import { HomePageService } from './home-page/home-page.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [],
  controllers: [HomePageController, UserController],
  providers: [HomePageService],
})
export class AppModule {}
