#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Possíveis localizações do arquivo server.js
const possiblePaths = [
  './dist/server.js',
  './src/dist/server.js',
  path.join(__dirname, 'dist', 'server.js'),
  path.join(__dirname, 'src', 'dist', 'server.js')
];

console.log('🔍 Procurando arquivo server.js...');
console.log('📁 Diretório atual:', process.cwd());
console.log('📁 __dirname:', __dirname);

// Lista arquivos no diretório atual
console.log('\n📂 Conteúdo do diretório atual:');
try {
  const files = fs.readdirSync('.');
  files.forEach(file => {
    const stats = fs.statSync(file);
    console.log(`${stats.isDirectory() ? '📁' : '📄'} ${file}`);
  });
} catch (error) {
  console.error('❌ Erro ao listar diretório:', error.message);
}

// Verifica se existe pasta dist
if (fs.existsSync('./dist')) {
  console.log('\n📂 Conteúdo da pasta dist:');
  try {
    const distFiles = fs.readdirSync('./dist');
    distFiles.forEach(file => {
      const stats = fs.statSync(path.join('./dist', file));
      console.log(`${stats.isDirectory() ? '📁' : '📄'} dist/${file}`);
    });
  } catch (error) {
    console.error('❌ Erro ao listar pasta dist:', error.message);
  }
} else {
  console.log('⚠️  Pasta dist não encontrada!');
}

// Procura pelo arquivo server.js
let serverPath = null;
for (const possiblePath of possiblePaths) {
  console.log(`🔍 Verificando: ${possiblePath}`);
  if (fs.existsSync(possiblePath)) {
    serverPath = possiblePath;
    console.log(`✅ Encontrado: ${serverPath}`);
    break;
  } else {
    console.log(`❌ Não encontrado: ${possiblePath}`);
  }
}

if (!serverPath) {
  console.error('💥 Arquivo server.js não encontrado em nenhum local!');
  console.error('🔧 Executando build...');
  
  // Tenta executar o build
  const buildProcess = spawn('npm', ['run', 'build'], { stdio: 'inherit' });
  
  buildProcess.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Build concluído com sucesso');
      // Tenta novamente após o build
      if (fs.existsSync('./dist/server.js')) {
        console.log('🚀 Iniciando servidor...');
        const serverProcess = spawn('node', ['./dist/server.js'], { stdio: 'inherit' });
        serverProcess.on('error', (error) => {
          console.error('💥 Erro ao iniciar servidor:', error);
          process.exit(1);
        });
      } else {
        console.error('💥 Arquivo server.js ainda não encontrado após build');
        process.exit(1);
      }
    } else {
      console.error('💥 Build falhou com código:', code);
      process.exit(1);
    }
  });
  
  buildProcess.on('error', (error) => {
    console.error('💥 Erro ao executar build:', error);
    process.exit(1);
  });
} else {
  console.log('🚀 Iniciando servidor...');
  const serverProcess = spawn('node', [serverPath], { stdio: 'inherit' });
  
  serverProcess.on('error', (error) => {
    console.error('💥 Erro ao iniciar servidor:', error);
    process.exit(1);
  });
  
  serverProcess.on('close', (code) => {
    console.log(`🛑 Servidor encerrado com código: ${code}`);
    process.exit(code);
  });
}