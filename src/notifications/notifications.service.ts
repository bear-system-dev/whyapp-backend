import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { NotificationDto } from './dto/notifications.dto';


@Injectable()
export class NotificationsService {

  constructor(
    private prisma: PrismaService,
  ) {}



  public async createNotifications(NotificationData: NotificationDto) {
    try {
      const newNotification = await this.prisma.user.update({
        where: {
          id: NotificationData.destinatarioId,
        },
        data: {
          notifications: {
            create: {
              categoria: NotificationData.categoria,
              mensagem: NotificationData.mensagem,
              readAt: NotificationData.readAt,
              canceledAt: NotificationData.canceledAt,
            },
          },
        },
      });
      return newNotification;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao criar notificação');
    }
  }


  public async getAllNotifications(recipientId: string) {
    try {
      const notifications = await this.prisma.notification.findMany({
        where: { destinatarioId: recipientId },
      });
      return notifications;
    } catch {
      return new Error('Erro ao obter notificações');
    }
  }


  public async updateNotification(notificationId: string, NotificationData: Partial<NotificationDto>) {
    try {
      const notification = await this.prisma.notification.findUnique({
        where: { id: notificationId },
      });
      if (!notification) {
        return new NotFoundException('Notificação não encontrada');
      }

      const updatedNotification = await this.prisma.notification.update({
        where: { id: notificationId },
        data: NotificationData,
      });
      return updatedNotification;
    } catch {
      return new Error('Erro ao atualizar notificação');
    }
  }

  public async deleteNotification(id: string) {
    try {
      const notification = await this.prisma.notification.findUnique({
        where: { id },
      });
      if (!notification) {
        return new NotFoundException('Notificação não encontrada');
      }

      await this.prisma.notification.delete({
        where: { id },
      });
      return { message: 'Notificação deletada com sucesso' };
    } catch {
      return new Error('Erro ao deletar notificação');
    }
  }
}
