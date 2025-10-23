#!/usr/bin/env node

// Arquivo para resolver o problema de caminho do Render
// O Render está procurando em /opt/render/project/src/dist/server.js

console.log('🚀 Iniciando servidor do Render...');
console.log('📁 Caminho atual:', __dirname);
console.log('📁 Process cwd:', process.cwd());

const fs = require('fs');
const path = require('path');

// Volta para a raiz do projeto (2 níveis acima)
const rootDir = path.join(__dirname, '..', '..');
process.chdir(rootDir);

console.log('📁 Mudando para raiz:', rootDir);

// Verifica se existe o servidor compilado na pasta dist da raiz
const distServerPath = path.join(rootDir, 'dist', 'server.js');
const mainServerPath = path.join(rootDir, 'server.js');

if (fs.existsSync(distServerPath)) {
  console.log('✅ Encontrado servidor compilado em dist/server.js');
  require(distServerPath);
} else if (fs.existsSync(mainServerPath)) {
  console.log('✅ Encontrado servidor principal em server.js');
  require(mainServerPath);
} else {
  console.log('⚠️  Executando build primeiro...');
  const { execSync } = require('child_process');
  
  try {
    execSync('npm run build', { stdio: 'inherit', cwd: rootDir });
    
    if (fs.existsSync(distServerPath)) {
      console.log('✅ Build concluído, iniciando servidor...');
      require(distServerPath);
    } else {
      console.error('❌ Build falhou - arquivo não encontrado');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Erro no build:', error.message);
    process.exit(1);
  }
}