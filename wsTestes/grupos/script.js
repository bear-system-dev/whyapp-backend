/* 
  ATENÇÃO!!!
  Nada de comando NODE, é só executar o index.htm desta pasta e abrir o console em inspecionar elemento
*/

/* eslint-disable @typescript-eslint/no-unused-vars */
import { io } from 'https://cdn.socket.io/4.7.4/socket.io.esm.min.js';

const socket = io('http://127.0.0.1:3000/grupos');

socket.on('error', (data) => {
  console.log(data);
});

socket.on('load groups', (data) => {
  console.log(data);
});

document.querySelector('#loadGroups').addEventListener('click', (e) => {
  console.log('load groups');
  socket.emit('load groups', '72fe56ec-e397-4ae0-8765-9f602d3aab34');
});
