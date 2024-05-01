import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/database/prisma.service';
import { MailingService } from 'src/mailing/mailer.service';
import { BearHashingService } from 'src/utils/bearHashing/bear-hashing.service';

@Module({
  providers: [UsersService, PrismaService, MailingService, BearHashingService],
  exports: [UsersService, PrismaService, BearHashingService],
})
export class UsersModule {}
