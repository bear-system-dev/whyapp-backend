import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
  Get,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { GroupMessagesService } from './group-messages.service';
import { CreateGroupMessageDto } from './dto/create-group-message.dto';
import { UpdateGroupMessageDto } from './dto/update-group-message.dto';
import { ApiTags } from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { UserQueriesDTO } from 'src/users/dto/userQueries.dto';

@ApiTags('Group Messages')
@Controller('group-messages')
export class GroupMessagesController {
  constructor(private readonly groupMessagesService: GroupMessagesService) {}

  @Post()
  async create(
    @Body() createGroupMessageDto: CreateGroupMessageDto,
    @Res() res: Response,
  ) {
    const { grupoId, mensagem, usuarioId } = createGroupMessageDto;
    if (!grupoId || !mensagem || !usuarioId || mensagem.length <= 0)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          'Você precisa enviar grupoId, mensagem (Não vazio) e usuarioId no body',
        status: 400,
      });
    const message = await this.groupMessagesService.create(
      createGroupMessageDto,
    );
    if (message instanceof Error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: message.message,
        status: 500,
      });
    return res.status(StatusCodes.CREATED).json({
      message: 'Mensagem criada com sucesso',
      status: 200,
      data: message,
    });
  }

  @Delete(':id')
  async deleteByid(@Param('id') id: string, @Res() res: Response) {
    if (!id)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Você precisa enviar grupoId, mensagem, usuarioId no body',
        status: 400,
      });
    const message = await this.groupMessagesService.deleteById(id);
    if (message instanceof Error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: message.message,
        status: 500,
      });
    return res.status(StatusCodes.ACCEPTED).json({
      message: 'Mensagem removida com sucesso',
      status: 202,
      data: message,
    });
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateGroupMessageDto: UpdateGroupMessageDto,
    @Res() res: Response,
  ) {
    if (!id)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Você precisa enviar grupoId, mensagem, usuarioId no body',
        status: 400,
      });
    const { mensagem } = updateGroupMessageDto;
    if (!mensagem || mensagem.length <= 0)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Você precisa enviar mensagem (Não vazio) no body',
        status: 400,
      });
    const editedMessage = await this.groupMessagesService.updateById(
      id,
      mensagem,
    );
    if (editedMessage instanceof Error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: editedMessage.message,
        status: 500,
      });
    return res.status(StatusCodes.ACCEPTED).json({
      message: 'Mensagem atualizada com sucesso',
      status: 202,
      data: editedMessage,
    });
  }

  @Get(':grupoId')
  async getMessagesByGroupId(
    @Param('grupoId') grupoId: string,
    @Query() queries: UserQueriesDTO,
    @Res() res: Response,
  ) {
    const { filter, limit, orderDirection, page } = queries;
    const groupMessages = await this.groupMessagesService.getMessagesByGroupId(
      {
        filter: filter || '',
        limit: Number(limit) || 7,
        page: Number(page) || 1,
        orderDirection: orderDirection || 'asc',
      },
      grupoId,
    );
    if (groupMessages instanceof Error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: groupMessages.message,
        status: 500,
      });
    return res.status(StatusCodes.ACCEPTED).json({
      message: 'Mensagens encontradas',
      status: 200,
      data: groupMessages,
    });
  }
}
