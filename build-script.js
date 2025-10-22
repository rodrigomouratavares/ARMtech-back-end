#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔨 Iniciando build...');

// Remove pasta dist
if (fs.existsSync('dist')) {
  console.log('🗑️  Removendo pasta dist antiga...');
  fs.rmSync('dist', { recursive: true, force: true });
}

// Executa TypeScript compiler
console.log('📦 Compilando TypeScript...');
try {
  execSync('tsc', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Erro na compilação TypeScript:', error.message);
  process.exit(1);
}

// Renomeia o servidor compilado e cria redirecionamento
console.log('🔄 Configurando redirecionamento...');

// Renomeia o servidor compilado original
if (fs.existsSync('dist/server.js')) {
  fs.renameSync('dist/server.js', 'dist/server.js.real');
  console.log('📝 Servidor compilado renomeado para server.js.real');
}

// Cria arquivo de redirecionamento
const redirectContent = `#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando servidor do Render...');
console.log('📁 Diretório atual:', process.cwd());

// Verifica se existe o servidor compilado real
const realServerPath = path.join(__dirname, 'server.js.real');
if (fs.existsSync(realServerPath)) {
  console.log('✅ Encontrado servidor compilado, iniciando...');
  require('./server.js.real');
} else {
  console.log('⚠️  Servidor compilado não encontrado, usando start.js...');
  
  // Executa o start.js do diretório pai
  const startPath = path.join(__dirname, '..', 'start.js');
  if (fs.existsSync(startPath)) {
    console.log('🔄 Executando start.js...');
    require(startPath);
  } else {
    console.error('❌ Nem server.js.real nem start.js encontrados!');
    process.exit(1);
  }
}`;

fs.writeFileSync('dist/server.js', redirectContent);

console.log('✅ Build completed successfully');
console.log('📁 Arquivos criados:');
console.log('   - dist/server.js (redirecionamento)');
console.log('   - dist/server.js.real (servidor compilado)');
console.log('   - dist/ (outros arquivos compilados)');