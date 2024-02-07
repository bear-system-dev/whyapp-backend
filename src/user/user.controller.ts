import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('user')
export class UserController {
  @Post()
  create(
    @Body()
    data: { nome: string; email: string; senha: string; avatar: string },
    @Res() res: Response,
  ) {
    if (!data.nome || !data.email || !data.avatar)
      return res.status(400).json({
        message: 'Você deve fornecer NOME, EMAIL, SENHA e AVATAR',
      });
    return res.status(201).json(data);
  }
}
