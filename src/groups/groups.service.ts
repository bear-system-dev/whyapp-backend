import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Grupo } from '@prisma/client';
import { UpdateGroupDto } from './dto/update-group.dto';
// import { UpdateGroupDto } from './dto/update-group.dto';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const groupIncludedData = {
  cargos: true,
  mensagens: true,
  imagens: true,
  audio: true,
  videos: true,
  documentos: true,
  enquetes: true,
};

@Injectable()
export class GroupsService {
  constructor(private prismaService: PrismaService) {}
  async create(createGroupDto: CreateGroupDto): Promise<Error | Grupo[]> {
    const { nome, descricao, foto, token, usuarios } = createGroupDto;
    try {
      const grupo = await this.prismaService.user.update({
        where: {
          id: createGroupDto.proprietarioId,
        },
        data: {
          grupos: {
            create: {
              nome,
              descricao,
              foto,
              token,
              usuarios,
            },
          },
        },
        select: { grupos: { include: groupIncludedData } },
      });
      return grupo.grupos;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao criar grupo');
    }
  }

  async update(
    updateGroupDto: UpdateGroupDto,
    groupId: string,
  ): Promise<Error | Grupo> {
    try {
      const groupNewData = await this.prismaService.grupo.update({
        where: {
          id: groupId,
        },
        data: updateGroupDto,
        include: groupIncludedData,
      });
      return groupNewData;
    } catch (error) {
      console.log(error);
      return new Error('Um erro ocurreu ao atualizar os dados do grupo');
    }
  }

  async getById(id: string): Promise<Error | Grupo> {
    try {
      const grupo = await this.prismaService.grupo.findUnique({
        where: { id },
        include: groupIncludedData,
      });
      return grupo;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao buscar grupo pelo id');
    }
  }

  async deleteById(id: string): Promise<Error | Grupo> {
    try {
      const deletedGroup = await this.prismaService.grupo.delete({
        where: { id },
        include: groupIncludedData,
      });
      return deletedGroup;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao remover grupo pelo id');
    }
  }

  async getAllByUserId(userId: string): Promise<Error | Grupo[]> {
    try {
      const { grupos } = await this.prismaService.user.findFirst({
        where: { id: userId },
        select: { grupos: { include: groupIncludedData } },
      });
      return grupos;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao procurar por grupos deste usuário');
    }
  }
}
