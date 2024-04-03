import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueriesDto {
  @ApiProperty({ example: 'Lucas Silva' })
  filter?: string;

  @ApiProperty({ example: 7 })
  limit?: number;

  @ApiProperty({ example: 1 })
  page?: number;

  @ApiProperty({
    description:
      'Ordem de organização, baseado no banco de dados, do nome dos usuários retornados',
    enum: { asc: 'asc', desc: 'desc' },
    example: 'desc',
  })
  orderDirection?: 'asc' | 'desc';
}
