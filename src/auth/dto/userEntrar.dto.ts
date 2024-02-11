import { ApiProperty } from '@nestjs/swagger';

export class UserEntrarDTO {
  @ApiProperty()
  nome?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
