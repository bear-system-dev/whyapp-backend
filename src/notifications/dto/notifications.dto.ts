export class NotificationDto {
    destinatarioId: string;
    mensagem: string;
    categoria: string;
    readAt: Date;
    canceledAt: Date;
}