import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('WhyApp - Backend')
    .setDescription(
      `Aqui você encontra todos os endpoints da aplicação. Qualquer dúvida, entre em contato com o gerenciador do sistema.`,
    )
    .setVersion('v1.0.1')
    .setLicense(
      `©2023-2024 Bear System | Todos os direitos reservados`,
      `https://bearsystem.onrender.com`,
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/docs/api', app, document);

  await app.listen(3000);
}
bootstrap();
