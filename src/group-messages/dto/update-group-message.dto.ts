import { PartialType } from '@nestjs/swagger';
import { CreateGroupMessageDto } from './create-group-message.dto';

export class UpdateGroupMessageDto extends PartialType(CreateGroupMessageDto) {}
