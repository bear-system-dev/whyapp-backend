import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({ required: true, example: 'Amigos de Jogos' })
  nome: string;

  token?: string;

  @ApiProperty({ required: false, example: 'base64 Format' })
  foto?: string;

  @ApiProperty({ required: false })
  descricao?: string;

  @ApiProperty({ required: true })
  proprietarioId: string;
}
