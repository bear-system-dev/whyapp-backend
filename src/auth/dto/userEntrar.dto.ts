import { ApiProperty } from '@nestjs/swagger';

export class UserEntrarDTO {
  @ApiProperty({ example: 'Lucas Silva' })
  nome?: string;

  @ApiProperty({ example: 'lucasilva@hotmail.com' })
  email: string;

  @ApiProperty({ example: 'umaSenhaBemForteEComplexa' })
  senha: string;
}
