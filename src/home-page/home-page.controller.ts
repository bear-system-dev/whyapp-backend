import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HomePageController {
  @Get()
  home(): string {
    return 'Teste';
  }
}
