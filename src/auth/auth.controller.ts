import {
  Body,
  Controller,
  Headers,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDTO } from 'src/users/dto/userCreate.dto';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { UserEntrarDTO } from './dto/userEntrar.dto';
import { StatusCodes } from 'http-status-codes';
import { AuthGuard } from './auth.guard';
import { BCrypt } from 'src/utils/bcrypt.service';
import { CustomLogger } from 'src/utils/customLogger/customLogger.service';
import { BearHashingService } from 'src/utils/bearHashing/bear-hashing.service';
import { MailingService } from 'src/mailing/mailer.service';
const bcrypt = new BCrypt();

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private logService: CustomLogger,
    private bearHashingService: BearHashingService,
    private mailingService: MailingService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('sair/:id')
  async sair(
    @Param('id') userId: string,
    @Headers('Authorization') token: string,
    @Res() res: Response,
  ) {
    const user = await this.usersService.userUnique({ id: userId });
    if (user instanceof Error)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: user.message });

    const { nome, email } = user;
    const blackListedTokenFromRequest = {
      token,
      usuario: { userId, nome, email },
    };
    const isBlackListedToken = await this.authService.isBlackListedToken(
      blackListedTokenFromRequest,
    );
    if (isBlackListedToken instanceof Error)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: isBlackListedToken.message });
    const logout = this.authService.logOut(blackListedTokenFromRequest);
    if (logout) {
      return res
        .status(StatusCodes.OK)
        .json({ message: 'Deslogado com sucesso!' });
    }
    if (logout instanceof Error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: logout.message });
    }
  }

  @Post('entrar')
  async entrar(@Body() userData: UserEntrarDTO, @Res() res: Response) {
    if (!userData.email || !userData.senha)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Você deve fornecer o email e a senha' });

    const _originalUserEmail = userData.email;
    userData.email = this.bearHashingService.transform(userData.email);
    const verEmail = await this.usersService.userUnique({
      email: userData.email,
    });
    if (verEmail instanceof Error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: verEmail.message,
        errorStack: verEmail.stack,
        status: 500,
      });
    if (!verEmail)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Esse e-mail ainda não possui cadastro',
        status: 400,
      });
    const token = await this.authService.signIn(userData);
    if (token instanceof Error)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: token.message });
    this.logService.log({ message: 'Usuário entrou', token });

    res.cookie('userId', token.userId);
    res.cookie('jwtToken', token.token);

    await this.mailingService.sendLogin({
      to: _originalUserEmail,
      subject: 'Novo login em: WhyApp',
      text: 'O que seria isto?',
      userName: _originalUserEmail,
    });

    return res.status(StatusCodes.OK).json(token);
  }

  @Post('cadastrar')
  async cadastrar(@Body() data: UserCreateDTO, @Res() res: Response) {
    const erros: string[] = [];
    if (!data.nome) erros.push('Você deve fornecer o nome');
    if (!data.email) erros.push('Você deve fornecer o e-mail');
    if (!data.senha) erros.push('Você deve fornecer a senha');
    if (!data.avatar) erros.push('Você deve fornecer seu avatar');

    const newSenha = await bcrypt.hashData(data.senha);
    if (newSenha instanceof Error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: newSenha.message });
    data.senha = newSenha;

    const _originalUserEmail = data.email;
    data.email = this.bearHashingService.transform(data.email);

    if (erros.length <= 0) {
      const verEmail = await this.usersService.userUnique({
        email: data.email,
      });
      if (verEmail instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: verEmail.message,
          status: 500,
        });
      if (verEmail?.email === data.email)
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Esse e-mail já possui cadastro',
          status: 400,
        });

      const newUser = await this.usersService.createUser(data);
      if (newUser instanceof Error)
        return res.status(400).json({ messagae: newUser.message });
      this.logService.log({
        message: 'Novo usuário cadastrado',
        newUserId: newUser.id,
      });

      await this.mailingService.sendRegister({
        to: _originalUserEmail,
        subject: 'Bem Vindo(a) ao WhyApp',
        text: 'Aonde isso apareceeeee??',
        userName: data.nome,
      });

      return res.status(201).json({ newUserId: newUser.id });
    }
    return res.status(400).json({ erros });
  }
}
