export interface ISendEmail {
  to: string;
  subject: string;
  text: string | Buffer;
  userName: string;
}
