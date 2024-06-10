## BREVIÁRIO

1. JOIN GROUP
2. LEAVE GROUP
3. NEWGROUPMESSAGE

## EVENTOS NAMESPACE **/groups**

1. JOIN GROUP

Este evento é responsável por adicionar o usuário a uma sala websocket com o nome do grupo.

- Dados a serem enviados pelo frontend:<br>
  groupId (string - uuid)
```javascript
  socket.emit('join group', '123kj12-123kj41klj-12k4l12-1k24kl');
```
Em algum erro, como não ser enviado o **groupId**, será retornado o evento **error** com uma mensagem que poderá ser exibido como um log no frontend:
```javascript
  return client.emit('error', {
        mensagem: 'Você precisa fornecer o groupId',
      });
```
Tudo ocorrendo bem, o usuário será colocado na sala do grupo:
```javascript
  return client.join(groupId);
```

>**NOTA:** Este evento deve ser emitido todas as vezes que o usuário entrar em um grupo, só assim ele receberá o evento de mensagens
<br>

2. LEAVE GROUP

Este evento é o oposto do **JOIN GROUP**. Ele será responsável por retirar o usuário daquela sala do grupo

- São os mesmo dados do **JOIN GROUP** a serem enviados pelo frontend:<br>
  groupId (string - uuid)
  ```javascript
  socket.emit('leave group', '123kj12-123kj41klj-12k4l12-1k24kl');
  ```
Também retornará o evento **error** em caso de erros, e poderá ser exibido como um log no frontend:
```javascript
  return client.emit('error', {
          mensagem: 'Você precisa fornecer o groupId',
        });
```
Tudo ocorrendo bem, o usuário será removido daquela sala do grupo:
```javascript
  return client.leave(groupId);
```

>**NOTA:** Este evento deverá ser usado todas as vezes, antes do usúario mudar para um outro grupo. Assim ele só receberá os eventos do próximo grupo
<br>

3. NEWGROUPMESSAGE

Este evento é responsável por enviar as mensagens de um cliente/usuário os outros no mesmo grupo<br>
É preciso enviar um objeto contento: **messageId, userId e recipientsId(Array)** todos como uma *string*
```javascript
  socket.emit('newGroupMessage', data: {
      messageId: string;
      userId: string;
      recipientsId: Array<string>; //['recipientId1', 'recipientId2', 'recipientId3', ...]
    });
```
Caso ocorra algum erro, o evento **error** será retornado com uma mensagem
```javascript
  return client.emit('error', {
          mensagem: 'Erro ao buscar dados da mensagem',
        });
```
Em caso de sucesso, será emitido um evento de mesmo nome - *newGroupMessage* - para os outros clientes/usuários conectados à sala do grupo, que deverá ser capturado e validado pelo frontend O **groupId** é 
```javascript
  client.broadcast
      .in(messageData.grupoId)
      .emit('newGroupMessage', messageData);
```
>**NOTA:** O **groupId** é obtido diretamente dos dados na mensagem criada, no lado do backend

Por conta do evento não ser enviado de volta para o mesmo cliente/usuário, os dados da mensagem deverá ser mostrado no lado do frontend diretamente, sem esperar por algum evento.