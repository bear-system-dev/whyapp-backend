import { Module } from '@nestjs/common';
import { MailingService } from './mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';

const PROFESSIONAL_EMAIL = process.env.PROFESSIONAL_EMAIL || '';
const PROFESSIONAL_EMAIL_PASSWORD =
  process.env.PROFESSIONAL_EMAIL_PASSWORD || '';

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
