import { Module } from '@nestjs/common';
import { HomePageController } from './home-page/home-page.controller';
import { HomePageService } from './home-page/home-page.service';

@Module({
  imports: [],
  controllers: [HomePageController],
  providers: [HomePageService],
})
export class AppModule {}
