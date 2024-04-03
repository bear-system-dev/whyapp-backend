import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { GroupsGateway } from './groups.gateway';
import { GroupMessagesService } from 'src/group-messages/group-messages.service';

@Module({
  imports: [AuthModule],
  controllers: [GroupsController],
  providers: [
    GroupsService,
    PrismaService,
    GroupsGateway,
    GroupMessagesService,
  ],
})
export class GroupsModule {}
