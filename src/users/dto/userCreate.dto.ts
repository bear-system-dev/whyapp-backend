import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDTO {
  @ApiProperty({ example: 'Lucas Silva' })
  nome: string;

  @ApiProperty({ example: 'lucasilva@hotmail.com' })
  email: string;

  @ApiProperty({ example: 'umaSenhaBemForteEComplexa' })
  senha: string;

  @ApiProperty({
    description:
      'Deve-se fornecer uma imagem default em formato base64, caso o usuário não selecione alguma',
    example: 'base64',
  })
  avatar: string;
}
