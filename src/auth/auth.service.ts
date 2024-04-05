/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntrarDTO } from './dto/userEntrar.dto';
import { BlackListedTokenDTO } from './dto/blackListedToken.dto';
import { BCrypt } from 'src/utils/bcrypt.service';
const bcrypt = new BCrypt();

@Injectable()
export class AuthService {
  private blackListedTokens: Array<BlackListedTokenDTO> = [];
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: UserEntrarDTO) /*: Promise<{ token: string }>*/ {
    try {
      const user = await this.usersService.userUnique({ email: data.email });
      if (user instanceof Error) return new Error(user.message);

      const isPassEqual = await bcrypt.compareData(data.senha, user.senha);
      if (!isPassEqual) return new Error('Senha incorreta');

      const isEmailEqual = await bcrypt.compareData(data.email, user.email);
      if (!isEmailEqual) return new Error('E-amil incorreto');

      const token = await this.jwtService.signAsync({ userId: user.id });

      return { userId: user.id, token };
    } catch (error) {
      console.log(error);
      return new Error('Erro ao buscar registro');
    }
  }

  async logOut(token: BlackListedTokenDTO) {
    try {
      this.blackListedTokens.push(token);
      return true;
    } catch (error) {
      console.log(error);
      return new Error('Não foi possível deslogar do sistema');
    }
  }

  async isBlackListedToken(token: BlackListedTokenDTO): Promise<Error> {
    for (const blackListedToken of this.blackListedTokens) {
      console.log(blackListedToken, token);
      if (token.token === blackListedToken.token) {
        console.log('Este token já fez logout e saiu do sistema');
        return new Error('Este token já fez logout e saiu do sistema');
      }
    }
  }
}
