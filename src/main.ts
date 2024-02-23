import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Documentação WhyApp - Backend')
    .setDescription(
      `Aqui você encontra todos os endpoints da aplicação. Qualquer dúvida, entre em contato com o gerenciador do sistema.
      \nATENÇÃO! Ao fazer uma requisição, o banco de dados pode ser alterado. Se isso ocorrer, por favor, remova os dados que você adicionou.
      `,
    )
    .setVersion('v1.4.0')
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
