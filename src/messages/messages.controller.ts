import {
  Body,
  Controller,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrivateMessageDTO } from './dto/PrivateMessageDTO';
import { StatusCodes } from 'http-status-codes';

interface IQueryProps
  extends Omit<PrivateMessageDTO, 'menssagem' | 'fromUserId'> {}

@ApiTags('Message')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(AuthGuard)
  @Post('private/:fromUserId/text')
  async createPrivateMessage(
    @Query() query: IQueryProps,
    @Param('fromUserId') fromUserId: string,
    @Body() mensagem: string,
    @Res() res: Response,
  ) {
    const { toUserId, toUserName } = query;
    if (!fromUserId || !toUserId || !toUserName || !mensagem)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          'Você deve fornecer toUserId, toUserName como Query Params e mensagem no Body',
        status: 400,
      });
    const privateMessage = await this.messagesService.createPrivateMessage({
      mensagem,
      fromUserId,
      toUserId,
      toUserName,
    });
    if (privateMessage instanceof Error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: privateMessage.message, statusCode: 500 });
    return res.status(StatusCodes.CREATED).json({
      message: 'Mensagem Criada',
      conteudo: privateMessage, // Retornar mensagem quando estiver pronto
      status: 200,
    });
  }
}
