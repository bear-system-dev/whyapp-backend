
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

