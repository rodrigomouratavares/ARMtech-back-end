import { FastifyPluginAsync } from 'fastify';
import cors from '@fastify/cors';

const corsPlugin: FastifyPluginAsync = async (fastify) => {
  console.log('🔧 Configurando CORS...');
  
  await fastify.register(cors, {
    origin: [
      'http://localhost:5173',
      'http://localhost:3000', 
      'http://127.0.0.1:5173',
      'https://ar-mtech-front-end-4qfx.vercel.app',
      'https://ar-mtech-front-end-4qfx-5cp1gz77z-rodrigo-tavares-projects.vercel.app',
      /^https:\/\/ar-mtech-front-end.*\.vercel\.app$/
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  console.log('✅ CORS configurado com sucesso');
};

export default corsPlugin;