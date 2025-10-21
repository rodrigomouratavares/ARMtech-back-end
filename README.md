# 🚀 ARMtech Flow CRM - Backend API

> Sistema de CRM completo com API REST robusta, autenticação JWT e integração com PostgreSQL

## 📋 Sobre o Projeto

O **ARMtech Flow CRM Backend** é uma API REST moderna e escalável desenvolvida para gerenciar vendas, clientes, produtos e relatórios. Construído com **Node.js**, **Fastify** e **PostgreSQL**, oferece uma base sólida para sistemas de CRM empresariais.

### ✨ Principais Funcionalidades

- 🔐 **Autenticação JWT** com controle de permissões
- 👥 **Gestão de Usuários** com diferentes níveis de acesso
- 🛒 **Sistema de Pré-vendas** completo
- 📦 **Controle de Produtos** com geração automática de códigos
- 👤 **Gestão de Clientes** com validação de CPF
- 💳 **Formas de Pagamento** configuráveis
- 📊 **Relatórios** detalhados e filtráveis
- 📈 **Cálculo de Preços** com margem e markup
- 📋 **Controle de Estoque** com ajustes automáticos
- 🔍 **Auditoria** completa de ações do sistema

## 🛠️ Tecnologias Utilizadas

### Core
- **Node.js** - Runtime JavaScript
- **TypeScript** - Tipagem estática
- **Fastify** - Framework web de alta performance
- **PostgreSQL** - Banco de dados relacional

### ORM & Database
- **Drizzle ORM** - Type-safe SQL toolkit
- **PostgreSQL** - Banco principal (Neon Cloud)
- **Migrations** - Controle de versão do banco

### Autenticação & Segurança
- **JWT** - JSON Web Tokens
- **bcrypt** - Hash de senhas
- **CORS** - Cross-Origin Resource Sharing
- **Rate Limiting** - Controle de taxa de requisições

### Validação & Logs
- **Zod** - Validação de schemas
- **Audit Logs** - Sistema de auditoria
- **Error Handling** - Tratamento robusto de erros

### Testes & Qualidade
- **Vitest** - Framework de testes
- **Integration Tests** - Testes de integração
- **Performance Tests** - Testes de performance

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- PostgreSQL (local ou cloud)

### 1. Clone o repositório
```bash
git clone https://github.com/rodrigomouratavares/ARMtech-back-end.git
cd ARMtech-back-end
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/flow_crm

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

# Server
PORT=3000
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173
```

### 4. Execute as migrações
```bash
npm run db:migrate
```

### 5. Popule o banco com dados iniciais (opcional)
```bash
npm run db:seed
```

### 6. Inicie o servidor
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## 📡 API Endpoints

### 🔐 Autenticação
```
POST   /api/auth/login     # Login do usuário
POST   /api/auth/register  # Registro (admin only)
GET    /api/auth/me        # Perfil do usuário
POST   /api/auth/logout    # Logout
```

### 👥 Usuários
```
GET    /api/users          # Listar usuários
GET    /api/users/:id      # Buscar usuário
PUT    /api/users/:id      # Atualizar usuário
DELETE /api/users/:id      # Deletar usuário
```

### 👤 Clientes
```
GET    /api/customers      # Listar clientes
POST   /api/customers      # Criar cliente
GET    /api/customers/:id  # Buscar cliente
PUT    /api/customers/:id  # Atualizar cliente
DELETE /api/customers/:id  # Deletar cliente
```

### 📦 Produtos
```
GET    /api/products       # Listar produtos
POST   /api/products       # Criar produto
GET    /api/products/:id   # Buscar produto
PUT    /api/products/:id   # Atualizar produto
DELETE /api/products/:id   # Deletar produto
```

### 🛒 Pré-vendas
```
GET    /api/presales       # Listar pré-vendas
POST   /api/presales       # Criar pré-venda
GET    /api/presales/:id   # Buscar pré-venda
PUT    /api/presales/:id   # Atualizar pré-venda
DELETE /api/presales/:id   # Deletar pré-venda
PUT    /api/presales/:id/status # Alterar status
```

### 💳 Formas de Pagamento
```
GET    /api/payment-methods     # Listar formas
POST   /api/payment-methods     # Criar forma
GET    /api/payment-methods/:id # Buscar forma
PUT    /api/payment-methods/:id # Atualizar forma
DELETE /api/payment-methods/:id # Deletar forma
```

### 📊 Relatórios
```
GET    /api/reports/summary           # Resumo geral
GET    /api/reports/payment-methods   # Relatório por forma de pagamento
```

### 📈 Cálculo de Preços
```
POST   /api/products/:id/calculate-price    # Calcular preço
POST   /api/products/:id/suggest-price      # Sugerir preço
POST   /api/price/margin-markup             # Calcular margem/markup
```

### 📋 Controle de Estoque
```
POST   /api/products/:id/stock-adjustment   # Ajustar estoque
GET    /api/stock-adjustments               # Histórico de ajustes
```

### 🔍 Auditoria
```
GET    /api/audit-logs                      # Logs de auditoria
GET    /api/users/:id/audit-logs            # Logs por usuário
```

## 🏗️ Estrutura do Projeto

```
src/
├── app.ts                    # Configuração principal do Fastify
├── server.ts                 # Ponto de entrada da aplicação
├── config/                   # Configurações
│   ├── database.ts          # Configuração do banco
│   ├── environment.ts       # Variáveis de ambiente
│   └── jwt.ts              # Configuração JWT
├── controllers/             # Controladores da API
│   ├── auth.controller.ts
│   ├── customers.controller.ts
│   ├── products.controller.ts
│   ├── presales.controller.ts
│   └── ...
├── services/               # Lógica de negócio
│   ├── auth.service.ts
│   ├── customers.service.ts
│   ├── products.service.ts
│   └── ...
├── db/                     # Database
│   ├── schema/            # Schemas Drizzle
│   ├── migrations/        # Migrações SQL
│   ├── connection.ts      # Conexão com DB
│   └── seed.ts           # Dados iniciais
├── routes/                # Definição de rotas
├── middlewares/           # Middlewares customizados
├── plugins/              # Plugins Fastify
├── schemas/              # Schemas de validação Zod
├── types/                # Definições TypeScript
└── utils/                # Utilitários
```

## 🔒 Sistema de Permissões

### Níveis de Usuário
- **Admin**: Acesso total ao sistema
- **Manager**: Gerenciamento de vendas e relatórios
- **Employee**: Operações básicas de vendas

### Controle de Acesso
```typescript
// Middleware de autenticação
const authMiddleware = createAuthMiddleware({
  required: true,
  roles: ['admin', 'manager']
});

// Verificação de permissões
if (!hasPermission(user, 'presales.create')) {
  throw new AuthorizationError();
}
```

## 📊 Monitoramento e Performance

### Health Check
```
GET /health  # Status da aplicação e banco
```

### Métricas Disponíveis
- **Cache Statistics** - Performance do cache
- **Database Health** - Status do PostgreSQL
- **System Metrics** - Uso de memória e CPU
- **Audit Statistics** - Estatísticas de auditoria

### Rate Limiting
- **Geral**: 100 req/min por IP
- **Login**: 5 tentativas/min por IP
- **Ajuste de Estoque**: 10 req/min por IP

## 🧪 Testes

### Executar Testes
```bash
# Todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Testes de integração
npm run test:integration

# Coverage
npm run test:coverage
```

### Tipos de Teste
- **Unit Tests** - Testes unitários de serviços
- **Integration Tests** - Testes de API endpoints
- **Performance Tests** - Testes de carga e performance
- **Database Tests** - Testes de operações no banco

## 🚀 Deploy

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

### Docker (Opcional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Performance

### Otimizações Implementadas
- **Connection Pooling** - Pool de conexões PostgreSQL
- **Query Optimization** - Queries otimizadas com índices
- **Caching** - Cache em memória para dados frequentes
- **Batch Operations** - Operações em lote quando possível
- **Prepared Statements** - Statements preparados para performance

### Benchmarks
- **Throughput**: ~2000 req/s (login endpoint)
- **Latency**: <50ms (operações CRUD simples)
- **Memory Usage**: ~150MB (idle)
- **Database Connections**: Pool de 10-20 conexões

## 🔧 Configurações Avançadas

### Variáveis de Ambiente Completas
```env
# Database
DATABASE_URL=postgresql://user:pass@host:port/db
DB_POOL_MIN=5
DB_POOL_MAX=20

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# Server
PORT=3000
NODE_ENV=production
HOST=0.0.0.0

# CORS
FRONTEND_URL=https://your-frontend.com
ALLOWED_ORIGINS=https://app1.com,https://app2.com

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=60000

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log

# Cache
CACHE_TTL=300000
CACHE_MAX_SIZE=1000

# Monitoring
ENABLE_METRICS=true
METRICS_PORT=9090
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- **ESLint** - Linting automático
- **Prettier** - Formatação de código
- **TypeScript** - Tipagem obrigatória
- **Conventional Commits** - Padrão de commits

## 📝 Changelog

### v1.0.0 (2024-10-21)
- ✨ Sistema completo de CRM
- 🔐 Autenticação JWT implementada
- 📦 CRUD completo de produtos
- 👤 Gestão de clientes
- 🛒 Sistema de pré-vendas
- 📊 Relatórios básicos
- 🔍 Sistema de auditoria
- 📈 Cálculo de preços avançado
- 📋 Controle de estoque

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Rodrigo Moura Tavares**
- GitHub: [@rodrigomouratavares](https://github.com/rodrigomouratavares)
- Email: rodrigomouratavares@gmail.com

## 🙏 Agradecimentos

- Equipe de desenvolvimento ARMtech
- Comunidade Node.js e TypeScript
- Contribuidores do projeto

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela!**