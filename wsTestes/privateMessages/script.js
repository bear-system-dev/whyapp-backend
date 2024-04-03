/* 
  ATENÇÃO!!!
  Nada de comando NODE, é só executar o index.htm desta pasta e abrir o console em inspecionar elemento
*/

/* eslint-disable @typescript-eslint/no-unused-vars */
import { io } from 'https://cdn.socket.io/4.7.4/socket.io.esm.min.js';

const recipientIds = [
  '29988e57-fe0c-4814-a2d8-d5d3be5c4bea',
  '732b49f9-8fda-4b7a-9f54-f4b057b25707',
];

/* EDITÁVEIS INÍCIO */
const userId = '5bf3229f-eb18-4f16-9b03-82c7e0bf15fa';
const userMsg = 'Olá. como vai?';
const recipientId = recipientIds[0];

const chatId =
  '29988e57-fe0c-4814-a2d8-d5d3be5c4bea5bf3229f-eb18-4f16-9b03-82c7e0bf15fa';
/* EDITÁVEIS FIM */

const _queries = `?userId=${userId}&recipientId=${recipientId}`;
const socket = io('http://127.0.0.1:3000' + _queries);

const emitButton = document
  .querySelector('button')
  .addEventListener('click', (e) => {
    e.preventDefault();
    newMessage(userMsg);
    setTimeout(() => {
      getMessages();
    }, 500);
  });

function newMessage(msg) {
  socket.emit('newMessage', msg);
}

function getMessages() {
  socket.emit('getMessages', chatId);
  socket.on('messages', (messages) => {
    console.log(messages);
  });
}
