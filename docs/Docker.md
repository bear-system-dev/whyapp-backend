## Utilização do Docker no Projeto

**IMPORTANTE**: Você deverá ter instalado e configurado o Docker no seu sistema

### EXECUÇÃO

- Primeiro, na raiz do projeto, inicie a composição de containers: 
```bash
docker compose up -d
```
>**NOTA:** **-d** irá executar os containers em modo Daemon (Em segundo plano). Utilize **docker compose down** ao invés de **up** para fechar os containers

- Você deverá agora entrar no container **whyapp** para fazer aplicar as migrations ao banco de dados
Execute:
```bash
docker compose exec -it whyapp sh
```
Com este comando você entrará em um terminal dentro do container **whyapp**

- Agora você pode aplicar as migrations ao banco de dados com:
```bash
yarn prisma migrate deploy
```
>**NOTA:** Para sair pressione **crtl + p** e depois **ctrl + q**. Se não funcionar, em último caso, utilize **ctrl + c**

- Para finalizar, você pode acessar [localhost:300](http://localhost:300), e confirmar o sucesso da execução. Se não tiver ocorrido algum erro, você poderá acessar as rotas de cadastro e login para de fato testar o banco de dados. Você pode fechar os containers e iniciá-los novamente para testar a persistência dos dados