export interface QueryDTO {
  filter?: string;
  limit?: number;
  page?: number;
  orderDirection?: 'asc' | 'desc';
}
