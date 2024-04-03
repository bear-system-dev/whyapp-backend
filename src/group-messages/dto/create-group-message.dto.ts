import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupMessageDto {
  mensagem: string;
  grupoId: string;
  usuarioId: string;

  @ApiProperty({ required: false })
  transmissaoId?: string;
}
