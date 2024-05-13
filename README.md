# WhyApp-Backend

### API do software [WhyApp](https://github.com/bear-system-dev/whyapp-frontend), desenvolvido pela [Bear System © | 2023](https://bearsystem.onrender.com)

## Depende

- [NodeJs LTS (v20.11.0)](https://nodejs.org/en)
  
O projeto é feito utilizando o framework [NestJS](https://docs.nestjs.com)

## Estrutura das pastas no projeto

Utilizamos a arquitetura padrão do NestJS. Em adição, disponibilizamos mais alguns detalhes para cada diretório e arquivo [aqui](https://github.com/bear-system-dev/whyapp-backend/blob/dev/docs/structure.md)

## Instalação e execução

### Docker

Caso prefira configurar com o Docker, utilizamos o compose para gerar os containers. [Clique aqui](https://github.com/bear-system-dev/whyapp-backend/blob/dev/docs/Docker.md) para acessar esta sessão

### NPM

Siga estes passos corretamente para instalar, testar e modificar a cópia desta API

1. **Obtenha um banco de dados POSTGREE**: Antes de tudo, você deve ter um banco de dados rodando. Nós utilizamos para testes o [Render](https://render.com) para hospedar.
2. **Configurar as variáveis de ambiente**: Você deve renomear o arquivo **./.env-exemple** para **.env** apenas.
3. **Conecte-se ao banco de dados POSTGREE**: Obtenha a URL de conexão e modifique a chave **DATABASE_URL** no arquivo **./.env**, assim como mostrado abaixo.
```bash 
   DATABASE_URL="postgresql://docker:docker@localhost:5434/docker?schema=public" 
```
   >**Nota:** Como pode ver, utilizamos um container docker do Postgree, a imagem que utilizamos foi a **bitnami/postgresql:latest** direto do **docker hub**
   
4. **Finalize a configuração**: Preencha as chaves obrigatórias restantes do arquivo **.env**
5. **Instale os pacotes necessários**: Faça as instalações das dependências com o comando
```bash
   npm i
```
6. **Execute a aplicação**: Pronto! Agora você pode executar a aplicação localmente com o comando:
```bash
   npm run start:dev
```
>**Nota:** Repare que estamos executando como **_dev_**, o que habilita o reinicio automático em caso de alteração no código, em produção você deve executar com **start:prod**. Confira os scripts no arquivo **_package.json_**

Ao seguir o passo-a-passo, a aplicação deve estar rodando corretamente. Assim você pode acessar através do seu [localhost na porta 3000](http:127.0.0.1:3000) e receber a mensagem: **_API WhyApp Backend - Rodando..._**

## Funcionamento e funcionalidades no projeto

### Eventos WebSocket

Utilizamos alguns eventos pra manter a conexão em tempo real em alguns momentos. Sendo a biblioteca padrão no NestJS o Socket.IO, optamos por manter. Tais eventos são utilizados em conjunto com as requisições HTTP da API REST padrão e você pode utilizá-los sem conflitos

Os eventos estão divididos em grupos por namespaces. Assim podemos organizar o contexto dos eventos para cada finalidade

- DIVISÃO POR NAMESPACES

1. **NAMESPACE /**
```bash
https://url_deploy/
```
>**NOTA:** Aqui ficam os eventos relacionados às mensagens privadas. [Clique aqui]() para visualizar os eventos e seus detalhes. __**Este grupo está sujeito à mudanças até a finalização do sistema de notificações**__

2. **NAMESPACE /messages**
```bash
https://url_deploy/messages
```
>**NOTA:** Aqui ficam os eventos relacionados às notificações e atualização dos usuários. [Clique aqui]() para visualizar os eventos e seus detalhes. __**Este grupo está sujeito à mudanças até a finalização do sistema de notificações**__

3. **NAMESPACE /grupos**
```bash
https://url_deploy/grupos
```
>**NOTA:** Aqui ficam os eventos relacionados às mensagens de grupo e funcionalidades relacionadas. [Clique aqui]() para visualizar os eventos e seus detalhes.

## Contribuição / Contributing
Você pode contribuir neste projeto livremente abrindo um Pull Request após fazer o Fork deste repositório.

## License
Este projeto está sob a Licença MIT - consulte o arquivo [LICENSE](https://github.com/bear-system-dev/whyapp-backend/blob/dev/LICENSE) para mais detalhes