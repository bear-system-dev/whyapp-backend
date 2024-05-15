## Campos Obrigatórios
### Configurações do Banco de Dados
Para rodar em localhost, defina `DB_HOST` como "localhost" e modifique `DB_PORT` se necessário (padrão: 5432).

```bash
DB_HOST="localhost"
DB_USER="user"
DB_PASSWORD="password"
DB_NAME="database"
DB_PORT="5432"
```

### URL da Localização do Banco de Dados
```bash
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"
```

### Segredo Principal para Criptografia e Hash de Dados no Sistema
```bash
SECRET_KEY=""
```

### Tempo de Duração do JSON Web Token (JWT)
Padrão: 10m

- `s` --> Segundos
- `m` --> Minutos
- `h` --> Horas
- `d` --> Dias

```bash
JWT_EXPIRES_IN=""
```

### Credenciais do ADMIN-UI do Socket.IO
Acesse em: [admin.socket.io](https://admin.socket.io/) (Fornecido na documentação do Socket.IO)

```bash
SOCKETIO_ADMIN_UI_USERNAME="admin" # Padrão: admin
SOCKETIO_ADMIN_UI_PASSWORD="admin2024" # Padrão: admin2024
SOCKETIO_ADMIN_UI_NAMESPACE_NAME="/admin" # Padrão: /admin
```

### Dados para Envio de E-mails
```bash
PROFESSIONAL_EMAIL=""
PROFESSIONAL_EMAIL_PASSWORD=""
PROFESSIONAL_NAME="Bear System"
```

### Campos Opcionais

#### Porta do Servidor
Porta em que o servidor irá rodar - Padrão: 3000

```bash
SERVER_PORT=
```

#### TTL para Rate Limiting do NestJS
Tempo de vida (TTL) para Rate Limiting do NestJS - Padrão: 60000 (milisegundos)

```bash
THROTTLER_TTL=
```

#### Limite para Rate Limiting do NestJS
Limite de requisições para Rate Limiting do NestJS - Padrão: 100

```bash
THROTTLER_LIMIT=
```

#### Parâmetro SALT para Hashing com BCrypt
Parâmetro SALT para hashing com BCrypt - Padrão: 8
**Nota:** Se alterado, as senhas já registradas não serão mais válidas.

```bash
SALT_BCRYPT=
```

#### End-point para Documentação com SWAGGER
End-point para acesso da documentação com SWAGGER - Padrão: "v1/docs/api"

```bash
SWAGGER_DOCS_PATH=
```