import { Module } from '@nestjs/common';
import { MailingService } from './mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';

const PROFESSIONAL_EMAIL = process.env.PROFESSIONAL_EMAIL
  ? process.env.PROFESSIONAL_EMAIL
  : undefined;
const PROFESSIONAL_EMAIL_PASSWORD = process.env.PROFESSIONAL_EMAIL_PASSWORD
  ? process.env.PROFESSIONAL_EMAIL_PASSWORD
  : undefined;
const PROFESSIONAL_NAME = process.env.PROFESSIONAL_NAME
  ? process.env.PROFESSIONAL_NAME
  : undefined;

if (!PROFESSIONAL_EMAIL) {
  throw new Error('Variável de ambiente PROFESSIONAL_EMAIL não foi encontrada');
} else if (!PROFESSIONAL_EMAIL_PASSWORD) {
  throw new Error(
    'Variável de ambiente PROFESSIONAL_EMAIL_PASSWORD não foi encontrada',
  );
} else if (!PROFESSIONAL_NAME) {
  throw new Error('Variável de ambiente PROFESSIONAL_NAME não foi encontrada');
}

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: PROFESSIONAL_EMAIL,
          pass: PROFESSIONAL_EMAIL_PASSWORD,
        },
      },
    }),
  ],
  providers: [MailingService],
})
export class MailingModule {}
