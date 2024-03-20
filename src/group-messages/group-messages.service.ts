import { Injectable } from '@nestjs/common';
import { CreateGroupMessageDto } from './dto/create-group-message.dto';
import { UpdateGroupMessageDto } from './dto/update-group-message.dto';

@Injectable()
export class GroupMessagesService {
  create(createGroupMessageDto: CreateGroupMessageDto) {
    return 'This action adds a new groupMessage';
  }

  findAll() {
    return `This action returns all groupMessages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupMessage`;
  }

  update(id: number, updateGroupMessageDto: UpdateGroupMessageDto) {
    return `This action updates a #${id} groupMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupMessage`;
  }
}
