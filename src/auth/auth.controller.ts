import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDTO } from 'src/users/createUser.dto';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('entrar')
  entrar(@Body() userData: { email: string; password: string }) {
    return this.authService.signIn(userData.email, userData.password);
  }

  @Post('cadastrar')
  cadastrar(@Body() data: UserCreateDTO, @Res() res: Response) {
    const erros: string[] = [];
    if (!data.nome) erros.push('Você deve fornecer o nome');
    if (!data.email) erros.push('Você deve fornecer o e-mail');
    if (!data.senha) erros.push('Você deve fornecer a senha');
    if (!data.avatar) erros.push('Você deve fornecer seu avatar');
    if (erros.length < 1) {
      const createdUser = this.usersService.createUser(data);
      if (createdUser instanceof Error) erros.push(createdUser.message);
    }
    if (erros.length >= 1) return res.status(400).json(erros);
    return res.status(201).json(data);
  }
}
