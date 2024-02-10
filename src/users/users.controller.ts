import {
  Controller,
  Delete,
  Param,
  Post,
  Res,
  Get,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { QueryDTO } from 'src/models/Query.dto';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll(@Query() queries: QueryDTO, @Res() res: Response) {
    const { filter, limit, orderDirection, page } = queries;
    const users = await this.usersService.getAll({
      filter: filter || '',
      limit: Number(limit) || 7,
      page: Number(page) || 1,
      orderDirection: orderDirection || 'asc',
    });
    if (users instanceof Error)
      return res.status(400).json({ message: users.message });
    if (users.length === 0)
      return res
        .status(400)
        .json({ message: 'Não existem usuários com essas informações' });
    return res.status(200).json({ users });
  }

  @Get(':id')
  async getById(@Param('id') userId: string, @Res() res: Response) {
    const user = await this.usersService.userUnique({ id: userId });
    if (user instanceof Error)
      return res.status(500).json({ message: user.message });
    if (user === null)
      return res
        .status(400)
        .json({ message: 'Usuário não existe no banco de dados' });
    return res.status(200).json({ user });
  }

  @Delete('remove-account/:id')
  async deleteById(@Param('id') userId: string, @Res() res: Response) {
    const deletedUser = await this.usersService.deleteById(userId);
    if (deletedUser instanceof Error)
      return res.status(400).json({
        message: deletedUser.message,
      });
    return res.status(200).json({
      message: 'Usuário excluído com sucesso',
      userId: deletedUser.id,
      userStatus: deletedUser.ativo,
    });
  }

  @Delete('activate-account/:id')
  async desactiveById(@Param('id') userId: string, @Res() res: Response) {
    const desactivatedUser = await this.usersService.desactiveById(userId);
    if (desactivatedUser instanceof Error)
      return res.status(400).json({
        message: desactivatedUser.message,
      });
    return res.status(200).json({
      message: 'Usuário desativado com sucesso',
      userId: desactivatedUser.id,
      userStatus: desactivatedUser.ativo,
    });
  }

  @Post('activate-account/:id')
  async activeById(@Param('id') userId: string, @Res() res: Response) {
    const activatedUser = await this.usersService.activeById(userId);
    if (activatedUser instanceof Error)
      return res.status(400).json({
        message: activatedUser.message,
      });
    return res.status(200).json({
      message: 'Usuário ativado com sucesso',
      userId: activatedUser.id,
      userStatus: activatedUser.ativo,
    });
  }
}
