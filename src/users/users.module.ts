import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/database/prisma.service';
import { UserController } from './users.controller';
import { BearHashingModule } from 'src/utils/bearHashing/bear-hashing.module';
import { MailingModule } from 'src/mailing/mailing.module';

@Module({
  imports: [MailingModule, BearHashingModule],
  providers: [UsersService, PrismaService],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}
