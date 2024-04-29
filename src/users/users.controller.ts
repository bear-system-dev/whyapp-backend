import {
  Controller,
  Delete,
  Param,
  Post,
  Res,
  Get,
  Query,
  Body,
  UseGuards,
  Session,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UsersService } from './users.service';
import { UserQueriesDTO } from './dto/userQueries.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDTO } from './dto/user.dto';
import { UserUpdateDTO } from './dto/userUpdate.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { StatusCodes } from 'http-status-codes';
import { userQueriesFriendsDTO } from './dto/userQueriesFriends.dto';
import { MailingService } from 'src/mailing/mailer.service';
import { BCrypt } from 'src/utils/bcrypt.service';
import { BearHashingService } from 'src/utils/bearHashing/bear-hashing.service';
const bcrypt = new BCrypt();

const usersEmailPasswordResetCodes = {};

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private usersService: UsersService,
    private mailingService: MailingService,
    private bearHashingService: BearHashingService,
  ) {}

  @Post('reset-password/reset')
  async resetPasswordReset(
    @Body() data: { userEmail: string; newPassword: string },
    @Res() res: Response,
    @Session() session: Record<string, any>,
    @Req() req: Request,
  ) {
    console.log(session);
    if (
      !session?.resetPassword?.sendCode ||
      !session?.resetPassword?.verifyCode
    )
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Sessão inválida, reenvie o código ou verifique novamente',
        status: 400,
        sessionId: session.id,
      });

    const { newPassword, userEmail } = data;
    if (
      !userEmail ||
      userEmail.length < 1 ||
      userEmail === '' ||
      !newPassword ||
      newPassword.length < 1 ||
      newPassword === ''
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Você deve enviar userEmail e newPassword no body',
        status: 400,
      });
    }

    const hashedEmail = this.bearHashingService.transform(userEmail);
    const userExists = await this.usersService.userUnique({
      email: hashedEmail,
    });
    if (userExists instanceof Error || !userExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Este usuário não existe',
        status: 400,
      });
    }

    const hashedNewPassword = await bcrypt.hashData(newPassword);
    if (hashedNewPassword instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: hashedNewPassword.message,
        status: 500,
      });
    }
    console.log(`${newPassword}: ${hashedNewPassword}`);

    const newPasswordUser = await this.usersService.updatePasswordByUserUnique(
      {
        email: hashedEmail,
      },
      hashedNewPassword,
    );
    if (newPasswordUser instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: newPasswordUser.message,
        status: 500,
      });
    }

    delete usersEmailPasswordResetCodes[userEmail];
    console.log('Delete: ', usersEmailPasswordResetCodes);

    await this.mailingService.sendResetPasswordNotfication({
      to: userEmail,
      subject: 'Troca de senha realizada',
      text: 'Troca de senha',
      userName: userEmail,
    });

    session.resetPassword.reset = true;
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: 'Erro ao finzalizar sessão',
          status: 500,
        });
      }
    });

    return res.status(StatusCodes.OK).json({
      message: 'Senha trocada com sucesso',
      status: 200,
    });
  }

  @Post('reset-password/verify-code')
  async resetPasswordVerify(
    @Query('resetCode') resetCode: string, //resetCode é o código digitado pelo usuário no front
    @Body() data: { userEmail: string },
    @Res() res: Response,
    @Session() session: Record<string, any>,
  ) {
    console.log(session);
    if (!session?.resetPassword?.sendCode)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Sessão inválida, reenvie o código',
        status: 400,
        sessionId: session.id,
      });

    const { userEmail } = data;
    if (!resetCode || resetCode.length < 1 || resetCode === '') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Você precisa enviar o resetCode como Query Param',
        status: 400,
      });
    }
    if (!userEmail || userEmail.length < 1 || userEmail === '') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Você deve enviar userEmail no body',
        status: 400,
      });
    }

    const hashedEmail = this.bearHashingService.transform(userEmail);
    const userExists = await this.usersService.userUnique({
      email: hashedEmail,
    });
    if (userExists instanceof Error || !userExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Este usuário não existe',
        status: 400,
      });
    }

    if (usersEmailPasswordResetCodes[userEmail]) {
      const code = usersEmailPasswordResetCodes[userEmail];
      console.log(code);
      if (code !== resetCode) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'O código informado é inválido',
          status: 400,
        });
      }

      session.resetPassword.verifyCode = true;

      return res.status(StatusCodes.OK).json({
        message: 'Código validado com sucesso',
        status: 200,
      });
    }

    return res.status(StatusCodes.BAD_REQUEST).json({
      message:
        'Usuário não solicitou o código de verificação, ou o servidor foi reiniciado',
      status: 400,
    });
  }

  @Post('reset-password/send-code')
  async resetPasswordSend(
    @Body() data: { userEmail: string },
    @Res() res: Response,
    @Session() session: Record<string, any>,
  ) {
    console.log(session);
    const { userEmail } = data;
    if (!userEmail || userEmail.length < 1 || userEmail === '') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Você deve enviar userEmail no body',
        status: 400,
      });
    }

    const hashedEmail = this.bearHashingService.transform(userEmail);
    const userExists = await this.usersService.userUnique({
      email: hashedEmail,
    });
    if (userExists instanceof Error || !userExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Este usuário não existe',
        status: 400,
      });
    }

    try {
      const resetPasswordCode: string =
        this.usersService.generateResetPasswordCode();
      await this.mailingService.sendResetPasswordCode(
        {
          to: userEmail,
          subject: 'Código para troca de senha',
          text: 'Reset Password',
          userName: userEmail,
        },
        resetPasswordCode,
      );
      usersEmailPasswordResetCodes[userEmail] = resetPasswordCode;
      console.log(usersEmailPasswordResetCodes);

      session.resetPassword = {
        userEmail,
        resetPasswordCode,
        sendCode: true,
      };

      return res.status(StatusCodes.OK).json({
        message: 'Código para troca de senha enviado com sucesso',
        status: 200,
        data: {
          userEmail,
          code: resetPasswordCode,
        },
        sessionId: session.id,
      });
    } catch (error) {
      console.log(
        `Erro ao enviar o código de troca de senha para o usuário: ${userEmail}`,
        error,
      );
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao enviar o código de troca de senha para o usuário',
        status: 500,
      });
    }
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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
