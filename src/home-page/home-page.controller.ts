import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Home')
@Controller('/')
export class HomePageController {
  @Get()
  home(): string {
    return 'Teste';
  }
}
