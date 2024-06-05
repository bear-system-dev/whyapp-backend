import { Module } from '@nestjs/common';
import { HomePageService } from './home-page.service';
import { HomePageController } from './home-page.controller';
import { HomePageGateway } from './home-page.gateway';

@Module({
  controllers: [HomePageController],
  providers: [HomePageService, HomePageGateway],
})
export class HomePageModule {}
