## BREVIÁRIO

1. [JOIN PRIVATE ROOM](#jpr)
2. [ISONLINE](#isOn)
3. [NOTIFICATION](#not)
4. [Tipos de CONTEXT](#cont)

## EVENTOS NAMESPACE **/notifications**

1. <a id='jpr'>JOIN PRIVATE ROOM</a>
Deve-se enviar o **userId: string** como parâmetro
```javascript
socket.emit('join private room', userId)
```
Nada será retornado, além de um evento **error** em caso de algum erro<br>
Assim, o usário será colocado dentro de uma sala pessoal com seu ID para receber as notificações
```javascript
return client.join(userId);
```
>**NOTA:** Este evento deve ser usado apenas após o usuário fazer login

Este evento também irá emitir um outro de nome **<a id='isOn'>isOnline²</a>** para os outros usuários na plataforma, contendo algumas informações do usuário que acabou de fazer login, podendo ser manipuladas no frontend
```javascript
{
  onlineUser: {
    name: string;
    userId: string;
    lastLoginDate: Date;
  },
  isOnline: true, 
}
``` 
>**NOTA:** Quando o usuário deslogar ou fechar a página, tal evento será emitido novamente. A diferença é que o **isOnline** terá o valor **false**

3. <a id='not'>NOTIFICATION</a>
Você deverá esperar pelo evento **notification**, que será emitido ao usuário enviar uma mensagem privada, de grupo, entre outros<br>
A estrutura dos dados enviado será da seguinte maneira: 
```javascript
{
  context: 'group-chats_newGroupMessage',
  contextMessage: 'Nova mensagem de grupo',
  from: userId,
  to: recipientId,
  data: messageData,
}
```
**NOTA:** A chave **context** pode ter algumas strings padrão que poderão ser gerenciadas para dar uma finalidade adequada à notificação. Já **contextMessage** será uma descrição mais geral do que está acontecendo e poderá ou não ser utilizada no frontend

### Tipos de **<a id='cont'>context</a>** disponíveis
O **context** sempre será com base no seguinte formato: __**namespace_event**__. A exemplo: **group-chats_newGroupMessage** --> Emitido do evento newGroupMessage no namespace group-chats<br>

- group-chats_newGroupMessage
- private-chats_newMessage
- Outros a vir...