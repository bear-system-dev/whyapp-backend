## Rest das Notificações

### Cria uma nova notificação

```http
POST /notifications
```

| Body   | Tipo       | Descrição                                  |
| :---------- | :--------- | :---------------------------------------- |
| `destinatarioId` | `string` | Insira o ID do destinatário da notificação |
| `mensagem`      | `string` | Insira a mensagem da notificação          |
| `categoria`     | `string` | Insira a categoria da notificação         |
| `readAt`        | `string` | Data e hora de leitura da notificação |
| `canceledAt`    | `string` | Data e hora de cancelamento da notificação  |

### Retorna todas as notificações de um Usuário

```http
GET /notifications/:userId
```

| Parâmetro    | Tipo       | Descrição                         |
| :----------- | :--------- | :--------------------------------- |
| `userId` | `string` | Insira o ID do destinatário         |

### Atualiza uma notificação a partir do ID

```http
PATCH /notifications/:notificationId
```

| Body           | Tipo       | Descrição                                   |
| :------------- | :--------- | :------------------------------------------ |
| `mensagem`     | `string` | Insira o novo conteúdo da mensagem          |
| `readAt`       | `string` | Data e hora de leitura da notificação (opcional) |
| `canceledAt`   | `string` | Data e hora de cancelamento da notificação (opcional) |

### Deleta uma notificação a partir do ID

```http
DELETE /notifications/:notificationId
```

| Parâmetro       | Tipo       | Descrição                                   |
| :-------------- | :--------- | :------------------------------------------ |
| `notificationId` | `string` | Insira o ID da notificação a ser deletada     |

### Notas

- **Rotas:** As rotas são acessadas por métodos HTTP diferentes (POST, GET, PATCH, DELETE).
- **Parâmetros:** Todos os parâmetros para criação e atualização são inseridos no corpo da requisição em formato JSON.