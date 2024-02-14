export class BlackListedTokenDTO {
  token: string;
  usuario?: {
    userId: string;
    nome: string;
    email: string;
  };
}
