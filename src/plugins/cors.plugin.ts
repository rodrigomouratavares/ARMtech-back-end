import { FastifyPluginAsync } from 'fastify';
import cors from '@fastify/cors';

const corsPlugin: FastifyPluginAsync = async (fastify) => {
  console.log('🔧 Configurando CORS...');
  
  // Configuração mais permissiva para resolver o problema
  await fastify.register(cors, {
    origin: true, // Permite todas as origens temporariamente
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    maxAge: 86400, // 24 horas
  });

  // Adiciona headers CORS manualmente também
  fastify.addHook('onRequest', async (request, reply) => {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    reply.header('Access-Control-Allow-Credentials', 'true');
  });

  // Handle preflight requests
  fastify.options('*', async (request, reply) => {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    reply.header('Access-Control-Allow-Credentials', 'true');
    reply.code(200).send();
  });

  console.log('✅ CORS configurado com sucesso');
};

export default corsPlugin;