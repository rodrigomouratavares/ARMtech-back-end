#!/usr/bin/env node

// Arquivo de entrada principal para o Render
// Este arquivo fica na raiz e resolve o problema de caminho

console.log('🚀 Iniciando servidor...');

const fs = require('fs');
const path = require('path');

// Verifica se existe o servidor compilado
if (fs.existsSync('./dist/server.js.compiled')) {
  console.log('✅ Usando servidor compilado');
  require('./dist/server.js.compiled');
} else if (fs.existsSync('./dist/server.js.real')) {
  console.log('✅ Usando servidor real');
  require('./dist/server.js.real');
} else if (fs.existsSync('./dist/server.js')) {
  console.log('✅ Usando servidor da pasta dist');
  require('./dist/server.js');
} else {
  console.log('⚠️  Executando build primeiro...');
  const { execSync } = require('child_process');
  
  try {
    execSync('npm run build', { stdio: 'inherit' });
    
    if (fs.existsSync('./dist/server.js.compiled')) {
      console.log('✅ Build concluído, iniciando servidor compilado...');
      require('./dist/server.js.compiled');
    } else if (fs.existsSync('./dist/server.js')) {
      console.log('✅ Build concluído, iniciando servidor...');
      require('./dist/server.js');
    } else {
      console.error('❌ Build falhou - arquivo não encontrado');
      console.log('📁 Conteúdo da pasta dist:');
      try {
        const files = fs.readdirSync('./dist');
        files.forEach(file => console.log(`  - ${file}`));
      } catch (error) {
        console.error('Erro ao listar dist:', error.message);
      }
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Erro no build:', error.message);
    process.exit(1);
  }
}