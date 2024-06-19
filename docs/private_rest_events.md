
## Rest das mensagens privadas

#### Retorna as mensagens pertencentes aos usuarios daquele chat

```http
  GET private-chats/messages
```

| Params   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `userId` | `string` | Insira o Id do usuario |
| `recipientId` | `string` | Insira o Id do usuario |

#### Atualiza a mensagem a partir do id dela

```http
  PATCH private-chats/messages
```


| body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `userId`      | `string` | insira o id do Usuario |
| `recipientId`      | `string` | insira o id do usuário |
| `messageId`      | `string` | insira o id da mensagem que ira ser alterada |
| `newContent`      | `string` | insira o conteúdo da mensagem que ira ser alterada |

#### Deleta a mensagem a partir do id dela
```http
  DELETE private-chats/messages
```


| body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `userId`      | `string` | insira o id do usuário |
| `recipientId`      | `string` | insira o id do usuário |
| `messageId`      | `string` | insira o id da mensagem que ira ser alterada |

### Notas

- **Rotas:** basicamente todas elas são iguais a única coisa que ira mudar é o metodo por onde ela será acessada 
- **Parâmetros:** todos os parâmetros são inseridos no body a partir de um json contendo suas informações.







