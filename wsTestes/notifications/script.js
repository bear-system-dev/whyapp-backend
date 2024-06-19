/* 
  ATENÇÃO!!!
  Nada de comando NODE, é só executar o index.htm desta pasta e abrir o console em inspecionar elemento
*/

/* eslint-disable @typescript-eslint/no-unused-vars */
import { io } from 'https://cdn.socket.io/4.7.4/socket.io.esm.min.js';

// const socket2 = io('http://127.0.0.1:3000/group-chats');
const socket = io('http://127.0.0.1:3000/private-chats', {
  query: {
    userId: '9f10c7a3-103a-40bd-b966-d95ca0d6ef8e',
    recipientId: 'cc6d7842-0793-4dac-968f-b8ba8ffd6ce0',
  },
});
const socket1 = io('http://127.0.0.1:3000/notifications');
const socket2 = io('http://127.0.0.1:3000/');

// socket.on('error', (data) => {
//   console.log(data);
// });

// socket.on('isOnline', (data) => {
//   console.log(data);
// });

// socket.on('notification', data => { console.log(data); })

document.querySelector('#connect').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('connect');
  socket1.emit('join private room', 'cc6d7842-0793-4dac-968f-b8ba8ffd6ce0');
});

// document.querySelector('#connect2').addEventListener('click', (e) => {
//   e.preventDefault();
//   console.log('connect2');
//   socket2.emit('join group');
// });

socket1.on('notification', data => { console.log(data); })

document.querySelector('#connect3').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('connect3');
  socket.emit('newMessage', 'Testeeee');
});
