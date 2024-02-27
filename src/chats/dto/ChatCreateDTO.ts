import { ApiProperty } from '@nestjs/swagger';
// import { Prisma } from '@prisma/client';

export class ChatCreateDTO {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  token?: string;

  // @ApiProperty()
  // usuario: Prisma.UserCreateNestedOneWithoutChatsInput;

  @ApiProperty()
  usuarioId: string;
}
