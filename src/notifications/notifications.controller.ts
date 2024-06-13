import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationDto } from './dto/notifications.dto';
import { ApiTags } from '@nestjs/swagger';
import { NotificationsGateway } from './notifications.gateway';

@Controller('notifications')
@ApiTags('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  @Post()
  async create(@Body() notificationDto: NotificationDto) {
    return await this.notificationsService.createNotifications(notificationDto);
  }

  @Get(':recipientId') // Se retornar vazio mesmo contendo dados, mudar para POST. GET aparentemente não funciona
  async findAll(@Param('recipientId') recipientId: string) {
    return await this.notificationsService.getAllNotifications(recipientId);
  }

  @Post('dynamic-online-users') //GET não funciona
  async dynamicOnlineUsers() {
    return this.notificationsGateway.getDynamicOnlineUsers();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() notificationDto: Partial<NotificationDto>,
  ) {
    return await this.notificationsService.updateNotification(
      id,
      notificationDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.notificationsService.deleteNotification(id);
  }
}
