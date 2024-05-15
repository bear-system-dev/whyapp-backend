## AuthController

Este controlador lida com operações relacionadas à autenticação de usuários.

### sair

**Descrição:**
Encerra a sessão de um usuário, efetuando logout.

**Método:** `POST`

**Endpoint:** `/auth/sair/:id`

**Parâmetros:**
- `id` (string): O ID do usuário.
- `Authorization` (string): O token de autorização enviado no cabeçalho da requisição.

**Retornos:**
- Retorna uma mensagem indicando o sucesso ou falha no logout do usuário.

### entrar

**Descrição:**
Autentica um usuário e gera um token de acesso.

**Método:** `POST`

**Endpoint:** `/auth/entrar`

**Parâmetros:**
- `userData` (UserEntrarDTO): Dados de autenticação do usuário (email e senha).

**Retornos:**
- Retorna um token de acesso se a autenticação for bem-sucedida.

### cadastrar

**Descrição:**
Cadastra um novo usuário no sistema.

**Método:** `POST`

**Endpoint:** `/auth/cadastrar`

**Parâmetros:**
- `data` (UserCreateDTO): Dados do novo usuário (nome, email, senha e avatar).

**Retornos:**
- Retorna o ID do novo usuário cadastrado, se a operação for bem-sucedida.

## ChatsService

Este serviço lida com operações relacionadas a chats.

### createChat

**Descrição:**
Cria um novo chat para um usuário.

**Parâmetros:**
- `chatCreateDTO` (ChatCreateDTO): Dados para criar um novo chat (nome e token).

**Retornos:**
- Retorna o chat criado se a operação for bem-sucedida.

### findNameByUserId

**Descrição:**
Encontra o nome de um chat pelo ID do usuário.

**Parâmetros:**
- `nome` (string): O nome do chat a ser encontrado.
- `usuarioId` (string): O ID do usuário para o qual procurar o chat.

**Retornos:**
- Retorna o chat encontrado, se existir, pelo nome e ID do usuário.


# UserController

Este controlador lida com as operações relacionadas aos usuários.

## resetPasswordReset

**Descrição:**
Redefine a senha de um usuário.

**Endpoint:** `POST /user/reset-password/reset`

**Parâmetros:**
- `userEmail` (string): O email do usuário.
- `newPassword` (string): A nova senha.

**Retornos:**
- 400 Bad Request: Se userEmail ou newPassword estiverem em falta ou vazios.
- 400 Bad Request: Se a sessão for inválida ou os códigos de redefinição de senha não estiverem disponíveis.
- 400 Bad Request: Se o usuário não existir.
- 500 Internal Server Error: Se ocorrer um erro interno ao gerar o hash da nova senha.
- 500 Internal Server Error: Se ocorrer um erro interno ao atualizar a senha do usuário.
- 200 OK: Se a senha for redefinida com sucesso.

## resetPasswordVerify

**Descrição:**
Verifica um código de redefinição de senha.

**Endpoint:** `POST /user/reset-password/verify-code`

**Parâmetros:**
- `resetCode` (string): O código de redefinição de senha.
- `userEmail` (string): O email do usuário.

**Retornos:**
- 400 Bad Request: Se `resetCode` ou `userEmail` estiverem em falta ou vazios.
- 400 Bad Request: Se a sessão for inválida ou o código de redefinição de senha não estiver disponível.
- 400 Bad Request: Se o usuário não existir.
- 400 Bad Request: Se o código informado for inválido.
- 200 OK: Se o código for validado com sucesso.

## resetPasswordSend

**Descrição:**
Envia um código de redefinição de senha para o email do usuário.

**Endpoint:** `POST /user/reset-password/send-code`

**Parâmetros:**
- `userEmail` (string): O email do usuário.

**Retornos:**
- 400 Bad Request: Se `userEmail` estiver em falta ou vazio.
- 400 Bad Request: Se o usuário não existir.
- 500 Internal Server Error: Se ocorrer um erro interno ao enviar o código de redefinição de senha.
- 200 OK: Se o código for enviado com sucesso.

## removeFriend

**Descrição:**
Remove um amigo da lista de amigos de um usuário.

**Endpoint:** `DELETE /user/amigos`

**Parâmetros:**
- `userId` (string): O ID do usuário.
- `friendId` (string): O ID do amigo a ser removido.

**Retornos:**
- 400 Bad Request: Se `userId` ou `friendId` estiverem em falta ou vazios.
- 500 Internal Server Error: Se ocorrer um erro interno ao verificar se os usuários são amigos.
- 400 Bad Request: Se o usuário não estiver na lista de amigos.
- 500 Internal Server Error: Se ocorrer um erro interno ao remover o amigo.
- 200 OK: Se o amigo for removido com sucesso.

## addFriend

**Descrição:**
Adiciona um amigo à lista de amigos de um usuário.

**Endpoint:** `POST /user/amigos`

**Parâmetros:**
- `userId` (string): O ID do usuário.
- `friendId` (string): O ID do amigo a ser adicionado.

**Retornos:**
- 400 Bad Request: Se `userId` ou `friendId` estiverem em falta ou vazios.
- 400 Bad Request: Se `userId` for igual a `friendId`.
- 500 Internal Server Error: Se ocorrer um erro interno ao verificar se os usuários são amigos.
- 400 Bad Request: Se o usuário já estiver na lista de amigos.
- 500 Internal Server Error: Se ocorrer um erro interno ao adicionar o amigo.
- 200 OK: Se o amigo for adicionado com sucesso.

## getAll

**Descrição:**
Obtém todos os usuários.

**Endpoint:** `GET /user`

**Parâmetros:**
- `filter` (string, opcional): O filtro a ser aplicado aos usuários.
- `limit` (number, opcional): O número máximo de usuários a serem retornados.
- `orderDirection` (string, opcional): A direção de ordenação dos usuários.
- `page` (number, opcional): A página de resultados a ser retornada.

**Retornos:**
- 400 Bad Request: Se ocorrer um erro ao recuperar os usuários.
- 200 OK: Uma matriz de objetos de usuário.

## getById

**Descrição:**
Obtém um usuário pelo ID.

**Endpoint:** `GET /user/:id`

**Parâmetros:**
- `id` (string): O ID do usuário.

**Retornos:**
- 400 Bad Request: Se o usuário não existir.
- 500 Internal Server Error: Se ocorrer um erro interno ao recuperar o usuário.
- 200 OK: O objeto do usuário.

## deleteById

**Descrição:**
Exclui um usuário pelo ID.

**Endpoint:** `DELETE /user/remove-account/:id`

**Parâmetros:**
- `id` (string): O ID do usuário.

**Retornos:**
- 400 Bad Request: Se o usuário não existir.
- 200 OK: O ID do usuário excluído e seu status.

## desactiveById

**Descrição:**
Desativa um usuário pelo ID.

**Endpoint:** `DELETE /user/activate-account/:id`

**Parâmetros:**
- `id` (string): O ID do usuário.

**Retornos:**
- 400 Bad Request: Se o usuário não existir.
- 200 OK: O ID do usuário desativado e seu status.

## activeById

**Descrição:**
Ativa um usuário pelo ID.

**Endpoint:** `POST /user/activate-account/:id`

**Parâmetros:**
- `id` (string): O ID do usuário.

**Retornos:**
- 400 Bad Request: Se o usuário não existir.
- 200 OK: O ID do usuário ativado e seu status.

## updateUser

**Descrição:**
Atualiza um usuário pelo ID.

**Endpoint:** `POST /user/update/:id`

**Parâmetros:**
- `id` (string): O ID do usuário a ser atualizado.
- `newData` (object): Os novos dados do usuário.

**Retornos:**
- 400 Bad Request: Se o usuário não existir.
- 200 OK: O ID do usuário atualizado.

# MESSAGES

## MyGateway

Este gateway WebSocket lida com as operações de mensagens entre clientes.

### onNewMessage

**Descrição:**
Lida com a chegada de uma nova mensagem e a transmite para os destinatários apropriados.

**Evento:** `newMessage`

**Parâmetros:**
- `body` (string): O corpo da mensagem.
- `client` (Socket): O cliente que enviou a mensagem.

**Retornos:**
- Emite uma nova mensagem para os destinatários apropriados.

### onGetMessages

**Descrição:**
Lida com a solicitação de obtenção de mensagens para uma sala específica.

**Evento:** `getMessages`

**Parâmetros:**
- `data` (string): A identificação da sala de mensagens.
- `client` (Socket): O cliente que solicita as mensagens.

**Retornos:**
- Emite as mensagens disponíveis para a sala especificada.

### onJoinPrivate

**Descrição:**
Lida com a solicitação de um cliente para ingressar em uma sala privada.

**Evento:** `join private`

**Parâmetros:**
- `client` (Socket): O cliente que deseja ingressar na sala privada.
- `mergedIds` (string): A identificação da sala privada.

**Retornos:**
- O cliente é adicionado à sala privada.

### onLeavePrivate

**Descrição:**
Lida com a solicitação de um cliente para sair de uma sala privada.

**Evento:** `leave private`

**Parâmetros:**
- `client` (Socket): O cliente que deseja sair da sala privada.
- `mergedIds` (string): A identificação da sala privada.

**Retornos:**
- O cliente é removido da sala privada.

## GroupsController

Este controlador gerencia operações relacionadas a grupos.

### create

**Descrição:**
Cria um novo grupo.

**Método:** `POST`

**Endpoint:** `/groups`

**Parâmetros:**
- `createGroupDto` (CreateGroupDto): Os dados do grupo a ser criado.

**Retornos:**
- Retorna o novo grupo criado.

### updateById

**Descrição:**
Atualiza os dados de um grupo existente.

**Método:** `PUT`

**Endpoint:** `/groups`

**Parâmetros:**
- `updateGroupDto` (UpdateGroupDto): Os novos dados do grupo.
- `groupId` (string): O ID do grupo a ser atualizado (fornecido como Query Param).

**Retornos:**
- Retorna os dados atualizados do grupo.

### getById

**Descrição:**
Obtém os dados de um grupo específico.

**Método:** `GET`

**Endpoint:** `/groups`

**Parâmetros:**
- `groupId` (string): O ID do grupo a ser obtido (fornecido como Query Param).

**Retornos:**
- Retorna os dados do grupo solicitado.

### deleteById

**Descrição:**
Remove um grupo existente.

**Método:** `DELETE`

**Endpoint:** `/groups`

**Parâmetros:**
- `groupId` (string): O ID do grupo a ser removido (fornecido como Query Param).

**Retornos:**
- Retorna os dados do grupo removido.

### getAllByUserid

**Descrição:**
Obtém todos os grupos associados a um determinado usuário.

**Método:** `GET`

**Endpoint:** `/groups/user-groups`

**Parâmetros:**
- `userId` (string): O ID do usuário para o qual buscar os grupos (fornecido como Query Param).

**Retornos:**
- Retorna os grupos associados ao usuário.

### addMembers

**Descrição:**
Adiciona membros a um grupo existente.

**Método:** `POST`

**Endpoint:** `/groups/add-members`

**Parâmetros:**
- `groupId` (string): O ID do grupo ao qual adicionar membros (fornecido como Query Param).
- `membros` (Array<AddMembersDto>): Array de membros a serem adicionados ao grupo.

**Retornos:**
- Retorna os membros adicionados ao grupo.

### removeMembers

**Descrição:**
Remove membros de um grupo existente.

**Método:** `POST`

**Endpoint:** `/groups/remove-members`

**Parâmetros:**
- `groupId` (string): O ID do grupo do qual remover membros (fornecido como Query Param).
- `membros` (Array<AddMembersDto>): Array de membros a serem removidos do grupo.

**Retornos:**
- Retorna os membros removidos do grupo.

## GroupMessagesController

Este controlador gerencia operações relacionadas às mensagens de grupo.

### create

**Descrição:**
Cria uma nova mensagem de grupo.

**Método:** `POST`

**Endpoint:** `/group-messages`

**Parâmetros:**
- `createGroupMessageDto` (CreateGroupMessageDto): Os dados da mensagem a ser criada.

**Retornos:**
- Retorna a nova mensagem de grupo criada.

### deleteByid

**Descrição:**
Remove uma mensagem de grupo existente.

**Método:** `DELETE`

**Endpoint:** `/group-messages/:id`

**Parâmetros:**
- `id` (string): O ID da mensagem a ser removida.

**Retornos:**
- Retorna os dados da mensagem removida.

### updateById

**Descrição:**
Atualiza uma mensagem de grupo existente.

**Método:** `PUT`

**Endpoint:** `/group-messages/:id`

**Parâmetros:**
- `id` (string): O ID da mensagem a ser atualizada.
- `updateGroupMessageDto` (UpdateGroupMessageDto): Os novos dados da mensagem.

**Retornos:**
- Retorna os dados da mensagem atualizada.

### getMessagesByGroupId

**Descrição:**
Obtém todas as mensagens de um grupo específico.

**Método:** `GET`

**Endpoint:** `/group-messages/:grupoId`

**Parâmetros:**
- `grupoId` (string): O ID do grupo para o qual buscar as mensagens.
- `queries` (UserQueriesDTO): Opções de consulta para filtrar, limitar e ordenar as mensagens (opcionais).

**Retornos:**
- Retorna as mensagens do grupo especificado.



