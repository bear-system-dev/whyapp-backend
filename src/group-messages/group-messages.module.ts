import { Module } from '@nestjs/common';
import { GroupMessagesService } from './group-messages.service';
import { GroupMessagesController } from './group-messages.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [GroupMessagesController],
  providers: [GroupMessagesService, PrismaService],
})
export class GroupMessagesModule {}
