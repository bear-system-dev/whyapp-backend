import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ISendEmail } from './entities/sendEmail';

const PROFESSIONAL_EMAIL = process.env.PROFESSIONAL_EMAIL;
const PROFESSIONAL_NAME = process.env.PROFESSIONAL_NAME;

@Injectable()
export class MailingService {
  constructor(private readonly mailerService: MailerService) {}

  async sendLogin(data: ISendEmail) {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const { userName, subject, text, to } = data;
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
  }

  async sendRegister(data: ISendEmail) {
    const { userName, subject, text, to } = data;
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
  }
}
