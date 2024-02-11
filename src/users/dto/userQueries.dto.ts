import { ApiProperty } from '@nestjs/swagger';

export class UserQueriesDTO {
  @ApiProperty()
  filter?: string;

  @ApiProperty()
  limit?: number;

  @ApiProperty()
  page?: number;

  @ApiProperty({
    description:
      'Ordem de organização, baseado no banco de dados, do nome dos usuários retornados',
    enum: { asc: 'asc', desc: 'des' },
  })
  orderDirection?: 'asc' | 'desc';
}
