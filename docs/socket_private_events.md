
## Conectar ao WebSocket

Para se conectar ao WebSocket de mensagens privadas, use o código abaixo, substituindo `http://localhost:3000` pela URL correta do servidor:

```javascript
const socket = io('http://localhost:3000', {
  query: {
    userId: 'USER_ID_AQUI',
    recipientId: 'RECIPIENT_ID_AQUI',
  },
});
```
### 1. Evento para enviar uma Nova Mensagem

Envie uma nova mensagem para um usuário específico.

- **Evento:** `newMessage`
- **Dados Enviados:** `string` (body)

#### Exemplo:

```javascript
socket.emit('newMessage', 'Olá, seja bem vindo a Bear System!');
```

Este evento também irá emitir um outro de nome **notification** para o **namespace /NOTIFICATIONS** contendo os dados necessários para notificar e atualizar o outro usuário:
```javascript
  this.server.of('/notifications').to(recipientId).emit('notification', {
      context: 'private-chats_newMessage',
      contextMessage: 'Nova mensagem privada',
      from: userId,
      to: recipientId,
      data: message,
    });
```
>**NOTA:** Lemos o **recipientId** e enviamos tal evento para a sala de nome com base no userId fornecido<br>

### 2. Entrar em uma Sala Privada

- **Evento:** `join private`
- **Dados Enviados:** `string` (ID combinado dos usuários)

#### Exemplo:

```javascript
const mergedIds = 'USER_ID1_USER_ID2'; // Formato combinado de IDs
socket.emit('join private', mergedIds);
```

### 3. Sair de uma Sala Privada

- **Evento:** `leave private`
- **Dados Enviados:** `string` (ID combinado dos usuários)

#### Exemplo:

```javascript
const mergedIds = 'USER_ID1_USER_ID2'; // Formato combinado de IDs
socket.emit('leave private', mergedIds);
```

## Notas
- para receber as mensagens em tempo real adicione o evento `newMessage`.

