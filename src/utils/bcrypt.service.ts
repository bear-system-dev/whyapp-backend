import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class BCrypt {
  private SALT: number = 16; //Se mudar, as senhas no DB não servirão mais.
  constructor() {}
  async hashData(data: string): Promise<string | Error> {
    try {
      const hashedData = await hash(data, this.SALT);
      return hashedData;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao criptografar dados');
    }
  }
  async compareData(
    data: string,
    hashedData: string,
  ): Promise<boolean | Error> {
    try {
      const isEqual = await compare(data, hashedData);
      return isEqual;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao comparar dados');
    }
  }
}
