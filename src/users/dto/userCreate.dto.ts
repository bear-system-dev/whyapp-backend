import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDTO {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  senha: string;

  @ApiProperty({
    description:
      'Deve-se fornecer uma imagem default em formato base64, caso o usuário não selecione alguma',
  })
  avatar: string;
}
