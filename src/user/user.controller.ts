import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserCreateDTO } from './createUser.dto';
@Controller('user')
export class UserController {
  @Post('cadastrar')
  create(@Body() data: UserCreateDTO, @Res() res: Response) {
    if (!data.nome || !data.email || !data.avatar)
      return res.status(400).json({
        message: 'Você deve fornecer NOME, EMAIL, SENHA e AVATAR',
      });
    return res.status(201).json(data);
  }
}
