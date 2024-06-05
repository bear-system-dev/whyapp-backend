/* 
  ATENÇÃO!!!
  Nada de comando NODE, é só executar o index.htm desta pasta e abrir o console em inspecionar elemento
*/

/* eslint-disable @typescript-eslint/no-unused-vars */
import { io } from 'https://cdn.socket.io/4.7.4/socket.io.esm.min.js';

const socket = io('http://127.0.0.1:3000/notifications');
const socket2 = io('http://127.0.0.1:3000/group-chats');

socket.on('error', (data) => {
  console.log(data);
});

socket.on('isOnline', (data) => {
  console.log(data);
});

document.querySelector('#connect').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('connect');
  socket.emit('join private room', '9f10c7a3-103a-40bd-b966-d95ca0d6ef8e');
});

document.querySelector('#connect2').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('connect2');
  socket2.emit('join group');
});
