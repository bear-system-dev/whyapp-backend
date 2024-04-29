import {
  Controller,
  Delete,
  Param,
  Post,
  Res,
  Get,
  Query,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { UserQueriesDTO } from './dto/userQueries.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDTO } from './dto/user.dto';
import { UserUpdateDTO } from './dto/userUpdate.dto';
import { StatusCodes } from 'http-status-codes';
import { userQueriesFriendsDTO } from './dto/userQueriesFriends.dto';
import { Public } from 'src/decorators/is-public-endpoint.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) { }

  @Delete('amigos')
  async removeFriend(
    @Query() queries: userQueriesFriendsDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const { userId, friendId } = queries;
    if (userId && friendId) {
      const isFriends = await this.usersService.isFriends(userId, friendId);
      if (isFriends instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: isFriends.message,
          status: 500,
        });
      if (!isFriends)
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Esse usuário não está na sua lista de amigos',
          status: 400,
        });
      const userWithoutFriend = await this.usersService.removeFriend(
        userId,
        friendId,
      );
      if (userWithoutFriend instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: userWithoutFriend.message,
          status: 500,
        });
      return res.status(StatusCodes.OK).json({
        message: 'Usuário removido da sua lista de amigos com sucesso',
        status: 500,
      });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Você precisar informar userId e friendId nos Queries Params',
      status: 400,
    });
  }

  @Post('amigos')
  async addFriend(
    @Query() queries: userQueriesFriendsDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const { userId, friendId } = queries;
    if (userId && friendId) {
      if (userId === friendId)
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Você não pode adicionar você mesmo a sua lista de amigos',
          status: 400,
        });
      const isFriends = await this.usersService.isFriends(userId, friendId);
      if (isFriends instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: isFriends.message,
          status: 500,
        });
      if (isFriends)
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Esse usuário já existe na sua lista de amigos',
          status: 400,
        });

      const findUsersFriend = await this.usersService.userUnique({
        id: friendId,
      });
      if (findUsersFriend instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: findUsersFriend.message,
          status: 500,
        });
      if (!findUsersFriend)
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Esse usuário não existe',
          status: 400,
        });
      const userWithFriend = await this.usersService.addFriend(
        userId,
        friendId,
      );
      if (userWithFriend instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: userWithFriend.message,
          status: 500,
        });
      return res.status(StatusCodes.OK).json({
        message: 'Usuário adicionado na sua lista de amigos com sucesso',
        userWithFriend,
      });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Você precisar informar userId e friendId nos Queries Params',
      status: 400,
    });
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista dos dados dos Usuários',
    type: UserDTO,
    isArray: true,
  })
  async getAll(@Query() queries: UserQueriesDTO, @Res() res: Response) {
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
  @ApiResponse({
    status: 200,
    description: 'Dados do Usuário Solicitado',
    type: UserDTO,
    isArray: false,
  })
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

  @Post('update/:id')
  async updateUser(
    @Param('id') userId: string,
    @Body() newData: UserUpdateDTO,
    @Res() res: Response,
  ) {
    const updatedUser = await this.usersService.updateUser(userId, newData);
    if (updatedUser instanceof Error)
      return res.status(400).json({
        message: updatedUser.message,
      });
    console.log(updatedUser);
    return res.status(200).json({
      message: 'Usuário atualizado com sucesso',
      userId: updatedUser.id,
    });
  }
}
