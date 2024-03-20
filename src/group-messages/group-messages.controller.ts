import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupMessagesService } from './group-messages.service';
import { CreateGroupMessageDto } from './dto/create-group-message.dto';
import { UpdateGroupMessageDto } from './dto/update-group-message.dto';

@Controller('group-messages')
export class GroupMessagesController {
  constructor(private readonly groupMessagesService: GroupMessagesService) {}

  @Post()
  create(@Body() createGroupMessageDto: CreateGroupMessageDto) {
    return this.groupMessagesService.create(createGroupMessageDto);
  }

  @Get()
  findAll() {
    return this.groupMessagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupMessagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupMessageDto: UpdateGroupMessageDto) {
    return this.groupMessagesService.update(+id, updateGroupMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupMessagesService.remove(+id);
  }
}
