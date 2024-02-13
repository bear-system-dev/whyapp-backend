import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UserCreateDTO } from './dto/userCreate.dto';
import { UserQueriesDTO } from './dto/userQueries.dto';
import { UserUpdateDTO } from './dto/userUpdate.dto';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createUser(data: UserCreateDTO): Promise<User | Error> {
    try {
      const user = await this.prisma.user.create({
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
      const uniqueUser = await this.prisma.user.findUnique({
        where: userWhereUniqueInput,
      });
      return uniqueUser;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao procurar registro');
    }
  }

  async deleteById(userId: string): Promise<User | Error> {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: { id: userId },
      });
      return deletedUser;
    } catch (error) {
      return new Error('Erro ao excluir usuario');
    }
  }

  async desactiveById(userId: string): Promise<User | Error> {
    try {
      const desactivatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: { ativo: false },
      });
      return desactivatedUser;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao desativar usuário');
    }
  }

  async activeById(userId: string): Promise<User | Error> {
    try {
      const activedUser = await this.prisma.user.update({
        where: { id: userId },
        data: { ativo: true },
      });
      return activedUser;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao ativar usuário');
    }
  }

  async getAll(queries: UserQueriesDTO): Promise<User[] | Error> {
    const { filter, limit, page, orderDirection } = queries;
    try {
      const users: Array<User> = await this.prisma.user.findMany({
        where: {
          nome: {
            contains: filter,
          },
        },
        orderBy: {
          nome: orderDirection,
        },
        take: limit,
        skip: (page - 1) * limit,
      });
      return users;
    } catch (error) {
      return new Error('Erro ao procurar registros');
    }
  }
  async updateUser(
    userId: string,
    newData: UserUpdateDTO,
  ): Promise<User | Error> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: newData,
      });

      return updatedUser;
    } catch (error) {
      return new Error('Erro ao Atualizar');
    }
  }
}
