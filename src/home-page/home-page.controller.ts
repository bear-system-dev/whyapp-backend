import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/is-public-endpoint.decorator';

@Public()
@ApiTags('Home')
@Controller('/')
export class HomePageController {
  @Get()
  home(): string {
    return '<h1>API WhyApp Backend - Rodando...<h1>';
  }
}
