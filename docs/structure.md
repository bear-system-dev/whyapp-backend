# Estrutura Principal


- **docs:** Armazena a documentação do projeto, fornecendo informações detalhadas sobre a sua utilização, implementação e outras considerações relevantes.
- **src:** Contém todo o código-fonte do projeto, incluindo módulos, serviços, controladores e outros artefatos relacionados à lógica de negócios.
- **test:** Destinada aos arquivos de teste, permitindo a implementação e execução de testes automatizados para garantir a qualidade do código.
- **wsTest:** Uma pasta específica para testes relacionados a WebSocket, contendo scripts e recursos destinados a essa finalidade.

# Pasta `src`

Na estrutura do projeto, a pasta `src` é a principal, contendo todos os arquivos e diretórios relacionados à lógica e funcionalidades da aplicação. Observe como ela se organiza:

## `Auth`

### Arquivos:

- **`auth.controller.ts`**: Controlador para requisições de autenticação (login, signup, logout).
- **`auth.guard.ts`**: Guarda para proteger rotas que requerem autenticação.
- **`auth.module.ts`**: Módulo de autenticação da aplicação.
- **`auth.service.ts`**: Serviço para lógica de autenticação.

### DTOs:

- **`dto/user-entrar.dto.ts`**: DTO para dados de entrada ao entrar na aplicação.
- **`dto/black-listed-token.dto.ts`**: DTO para tokens de acesso na lista negra.

Essa estrutura organiza as partes relacionadas à autenticação, facilitando o desenvolvimento e a manutenção da funcionalidade de autenticação da aplicação.

## `Chats`

### Arquivos:

- **`chat.module.ts`**: Módulo para gerenciar operações relacionadas a chats.
- **`chats.service.ts`**: Serviço para lógica de manipulação de chats.

### DTOs:

- **`dto/chat-create.dto.ts`**: DTO para criar um novo chat.

O `chat-create.dto.ts` define a estrutura de dados para criar um novo chat, incluindo propriedades como `nome`, `token` (opcional) e `usuarioId`.

## `Database`

Nesta pasta, encontramos:

- **`migrations`:** Contém migrações do banco de dados gerenciadas pelo Prisma.
- **`prisma.service.ts`:** Define e configura o serviço Prisma para interação com o banco de dados.
- **`schema.prisma`:** Arquivo de configuração do Prisma que descreve o modelo de dados da aplicação.

## `Decorator`

Dentro desta pasta, encontramos:

- **`is-public-endpoint.decorator.ts`:** Este arquivo define um decorator chamado `Public`, que é usado para marcar endpoints como públicos. Ele usa o `SetMetadata` do NestJS para configurar metadados que indicam que um endpoint é público.

## `Events`

Dentro desta pasta, encontramos:

- **`message.gateway.ts`:** Este arquivo implementa um gateway WebSocket para lidar com mensagens entre clientes. Ele utiliza o `@WebSocketGateway` do NestJS para configurar o gateway, definindo opções de CORS e namespace. Além disso, ele define métodos para notificar destinatários sobre novas mensagens e para salvar mensagens recebidas.

- **`events.module.ts`:** Este arquivo define um módulo `EventsModule` que pode ser utilizado para importar e configurar o gateway de mensagens WebSocket em outros módulos da aplicação.

## `group-messages`

Esta pasta contém os componentes relacionados ao gerenciamento de mensagens de grupo:

- **DTO:** Define a estrutura dos dados transferidos.
- **Controller:** Responsável pelas operações relacionadas às mensagens de grupo.
- **Module:** Encapsula os componentes do grupo de mensagens.
- **Service:** Implementa a lógica de negócios das mensagens de grupo.

## `Groups`

Esta pasta contém os componentes relacionados ao gerenciamento de grupos:

- **DTO:** Define a estrutura dos dados transferidos.
- **Controller:** Responsável pelas operações relacionadas aos grupos.
- **Module:** Encapsula os componentes do grupo.
- **Service:** Implementa a lógica de negócios dos grupos.

#### Arquivo `groups.gateway.ts`

Este arquivo contém a lógica para comunicação em tempo real relacionada aos grupos:

- **`onLoadGroups`:** Permite que um cliente carregue os grupos associados a um usuário.
- **`onJoinGroup`:** Permite que um cliente entre em um grupo específico.
- **`onLeaveGroup`:** Permite que um cliente saia de um grupo específico.
- **`onNewGroupMessage`:** Permite o envio de novas mensagens de grupo e seu broadcast para os membros do grupo.

## `home-page`

Esta pasta contém os componentes relacionados à página inicial da API:

- **Controller:** Responsável por lidar com as requisições relacionadas à página inicial.
- **Module:** Encapsula os componentes da página inicial.

#### Arquivo `home-page.controller.ts`

Este arquivo define um controlador para a página inicial da API:

- **`@Get() home()`:** Retorna uma mensagem HTML indicando que a API WhyApp Backend está em execução.

## `Mailing`

Esta pasta gerencia o serviço de envio de e-mails:

- **Service:** Lida com o envio de e-mails, incluindo notificações de login, boas-vindas, códigos de redefinição de senha e notificações de alteração de senha.

#### Arquivo `mailing.service.ts`

Este arquivo contém métodos para enviar diferentes tipos de e-mails, como notificações de login, boas-vindas e códigos de redefinição de senha. Ele também obtém as variáveis de ambiente necessárias para o envio de e-mails, como o endereço de e-mail profissional e a senha.

## `Messages`

Gerencia o serviço de mensagens entre usuários:

- **Service:** Lida com processamento de mensagens, criação de chats e mensagens, notificações e busca de mensagens.

## `Users`

Gerencia os usuários da aplicação:

- **Service:** Lida com operações relacionadas aos usuários, como criação, busca, atualização, exclusão e manipulação de amigos.

## `Utils`

Contém utilitários para configurar funcionalidades específicas:

- **Bcrypt Config:** Arquivo de configuração para o bcrypt, utilizado para criptografar senhas.
- **Cors Config:** Arquivo de configuração para o CORS (Cross-Origin Resource Sharing), utilizado para configurar políticas de acesso de recursos em diferentes origens.
- **Pasta `bearHashing`:** Contém lógica relacionada ao hashing de senhas, possivelmente utilizada para gerar e verificar hashes de senha de maneira segura.
- **Pasta `customLogger`:** Contém lógica relacionada ao serviço de log personalizado, utilizado para registrar eventos e erros de forma personalizada na aplicação.
