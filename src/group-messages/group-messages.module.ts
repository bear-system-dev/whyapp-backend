import { Module } from '@nestjs/common';
import { GroupMessagesService } from './group-messages.service';
import { GroupMessagesController } from './group-messages.controller';

@Module({
  controllers: [GroupMessagesController],
  providers: [GroupMessagesService],
})
export class GroupMessagesModule {}
