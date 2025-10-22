# Deploy no Render

## Configuração Automática

O projeto está configurado para deploy automático no Render usando o arquivo `render.yaml`.

### Processo de Deploy

1. **Build**: O Render executa `npm ci && npm run build`
   - Remove a pasta `dist/` existente
   - Compila o TypeScript para JavaScript
   - Verifica se o build foi bem-sucedido

2. **Start**: O Render executa `node dist/server.js`
   - Inicia o servidor a partir do arquivo compilado

### Variáveis de Ambiente Necessárias

Configure no dashboard do Render:

- `DATABASE_URL`: URL de conexão com PostgreSQL
- `JWT_SECRET`: Chave secreta para JWT
- `FRONTEND_URL`: URL do frontend (Vercel)

### Verificação de Saúde

O servidor expõe um endpoint de health check em `/health` que o Render usa para verificar se a aplicação está funcionando.

### Troubleshooting

Se o deploy falhar com erro "Cannot find module", verifique:

1. Se o build está sendo executado corretamente
2. Se o arquivo `dist/server.js` foi criado
3. Se as dependências estão instaladas corretamente

### Logs

Para verificar logs no Render:
1. Acesse o dashboard do Render
2. Vá para o serviço do backend
3. Clique na aba "Logs"