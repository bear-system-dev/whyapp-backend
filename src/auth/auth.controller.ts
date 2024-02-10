import { Body, Controller, Post, Res } from '@nestjs/common';
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

  @Post('entrar')
  entrar(@Body() userData: { email: string; password: string }) {
    return this.authService.signIn(userData.email, userData.password);
  }

  @Post('cadastrar')
  async cadastrar(@Body() data: UserCreateDTO, @Res() res: Response) {
    const erros: string[] = [];
    if (!data.nome) erros.push('Você deve fornecer o nome');
    if (!data.email) erros.push('Você deve fornecer o e-mail');
    if (!data.senha) erros.push('Você deve fornecer a senha');
    if (!data.avatar) erros.push('Você deve fornecer seu avatar');
    if (erros.length <= 0) {
      const newUser = await this.usersService.createUser(data);
      if (newUser instanceof Error)
        return res.status(400).json({ messagae: newUser.message });
      return res.status(201).json({ newUserId: newUser.id });
    }
    return res.status(400).json({ erros });
  }
}
