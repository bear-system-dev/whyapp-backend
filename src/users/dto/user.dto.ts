export class UserDTO {
  id?: string;
  nome: string;
  email: string;
  senha: string;
  ativo?: boolean;
  identificador?: string;
  avatar: string;
  descricao?: string;
  createdAt?: Date;
  updatedAt?: Date;
  opcaoEnqueteId?: string;
}
