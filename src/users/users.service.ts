import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UserCreateDTO } from './createUser.dto';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createUser(data: UserCreateDTO): Promise<User | Error> {
    try {
      const user = this.prisma.user.create({
        data: {
          nome: data.nome,
          email: data.email,
          senha: data.senha,
          avatar: data.avatar,
          ativo: false,
          identificador: '123456',
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      return new Error(`Erro ao criar usuário`);
    }
  }
  async userUnique(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | Error> {
    try {
      const uniqueUser = this.prisma.user.findUnique({
        where: userWhereUniqueInput,
      });
      return uniqueUser;
    } catch (error) {
      return new Error('Erro ao procurar registro');
    }
  }
  // async userName(username: string): Promise<User | Error> {
  //   try {
  //     const user = this.prisma.user.findFirst({
  //       where: {
  //         nome: username,
  //       },
  //     });
  //     return user;
  //   } catch (error) {
  //     return new Error('Erro ao procurar registro');
  //   }
  // }
}
