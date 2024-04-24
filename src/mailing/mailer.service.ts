import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ISendEmail } from './entities/sendEmail';

@Injectable()
export class MailingService {
  constructor(private readonly mailerService: MailerService) {}

  async sendLogin(data: ISendEmail) {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const { userName, subject, text, to } = data;
    const env = await this.getEnv();
    if (!(env instanceof Error)) {
      const { PROFESSIONAL_EMAIL, PROFESSIONAL_NAME } = env;
      await this.mailerService.sendMail({
        sender: { name: PROFESSIONAL_NAME, address: PROFESSIONAL_EMAIL },
        to,
        subject,
        text,
        html: `
        <div style='display:flex; justify-content:center; align-items:center; flex-direction:column; font-size:1.2rem'>
          <h1>Olá, ${userName}!</h1>
          <p>Novo login efetuado às ${time}, no dia ${date}</p>
          <p><i>Clique no botão abaixo se não foi você e efetue a troca da senha</i></p>
          <button style="background-color:green; width:200px; height:50px; border-radius:7px;">TROCAR SENHA</button>
        </div>
        `,
      });
    } else {
      console.log(env.message, ' Impossível enviar e-mails.');
    }
  }

  async sendRegister(data: ISendEmail) {
    const { userName, subject, text, to } = data;
    const env = await this.getEnv();
    if (!(env instanceof Error)) {
      const { PROFESSIONAL_EMAIL, PROFESSIONAL_NAME } = env;
      await this.mailerService.sendMail({
        sender: { name: PROFESSIONAL_NAME, address: PROFESSIONAL_EMAIL },
        to,
        subject,
        text,
        html: `
        <div style='display:flex; justify-content:center; align-items:center; flex-direction:column; font-size:1.2rem'>
          <h1>Bem vindo(a), ${userName}!</h1>
          <p>Estamos muito felizes em te ver por aqui. Esperamos que você tenha a melhor experiência em nosso aplicativo</p>
          <p><i>Para finalizar seu cadastro, <a href='' target='_blank'>clique aqui</a> ou no botão abaixo para confirmar seu email e ativar a conta</i></p>
          <button style="background-color:green; width:200px; height:50px; border-radius:7px;">CONFIRMAR</button>
          <br />
          <p>Se precisar entre com contato conosco! Iremos te atender em até 24h.</p>
        </div>
        `,
      });
    } else {
      console.log(env.message, ' Impossível enviar e-mails.');
    }
  }

  async sendResetPasswordCode(data: ISendEmail, code: string) {
    const { userName, subject, text, to } = data;
    const env = await this.getEnv();
    if (!(env instanceof Error)) {
      const { PROFESSIONAL_EMAIL, PROFESSIONAL_NAME } = env;
      await this.mailerService.sendMail({
        sender: { name: PROFESSIONAL_NAME, address: PROFESSIONAL_EMAIL },
        to,
        subject,
        text,
        html: `
        <div style='display:flex; justify-content:center; align-items:center; flex-direction:column; font-size:1.2rem'>
          <h1>Olá, ${userName}!</h1>
          <p>Aqui está seu código para a troca de senha</p>
          <div style='background-color:gray; width:300px; height:200px; display:flex; align-items:center; justify-content:center;'>
            <p style='font-size:1.6rem; font-weight:800;'>${code}</p>
          </div>
          <p><i>Lembre-se de não enviar este código para ninguém, <a href='' target='_blank'>clique aqui</a> ou no botão abaixo se não foi você</i></p>
          <button style="background-color:green; width:200px; height:50px; border-radius:7px;">SUPORTE</button>
          <br />
          <p>Se precisar entre com contato conosco! Iremos te atender em até 24h.</p>
        </div>
        `,
      });
    } else {
      console.log(env.message, ' Impossível enviar e-mails.');
    }
  }

  private async getEnv() {
    const PROFESSIONAL_EMAIL = process.env.PROFESSIONAL_EMAIL
      ? process.env.PROFESSIONAL_EMAIL
      : undefined;
    const PROFESSIONAL_EMAIL_PASSWORD = process.env.PROFESSIONAL_EMAIL_PASSWORD
      ? process.env.PROFESSIONAL_EMAIL_PASSWORD
      : undefined;
    const PROFESSIONAL_NAME = process.env.PROFESSIONAL_NAME
      ? process.env.PROFESSIONAL_NAME
      : undefined;

    if (!PROFESSIONAL_EMAIL) {
      return new Error(
        'Variável de ambiente PROFESSIONAL_EMAIL não foi encontrada.',
      );
    } else if (!PROFESSIONAL_EMAIL_PASSWORD) {
      return new Error(
        'Variável de ambiente PROFESSIONAL_EMAIL_PASSWORD não foi encontrada.',
      );
    } else if (!PROFESSIONAL_NAME) {
      return new Error(
        'Variável de ambiente PROFESSIONAL_NAME não foi encontrada.',
      );
    }

    return {
      PROFESSIONAL_EMAIL,
      PROFESSIONAL_EMAIL_PASSWORD,
      PROFESSIONAL_NAME,
    };
  }
}
