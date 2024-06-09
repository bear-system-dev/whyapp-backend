import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationDto } from './dto/notifications.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('notifications')
@ApiTags('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() notificationDto: NotificationDto) {
    return await this.notificationsService.createNotifications(notificationDto);
  }

  @Get(':recipientId')
  async findAll(@Param('recipientId') recipientId: string) {
    return await this.notificationsService.getAllNotifications(recipientId);
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() notificationDto: Partial<NotificationDto>) {
    return await this.notificationsService.updateNotification(id, notificationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.notificationsService.deleteNotification(id);
  }
}
