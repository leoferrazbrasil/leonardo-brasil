import { access, cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(__filename), '..');
const sourceDir = path.join(repoRoot, 'dist', 'brasa');
const defaultHostingerTarget = '/home/u299917777/domains/leonardobrasil.com.br/public_html/brasa';
const targetDir = process.env.BRASA_SUBDOMAIN_PUBLIC_DIR || defaultHostingerTarget;

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

function assertSafeTarget(target) {
  if (process.env.BRASA_SUBDOMAIN_PUBLIC_DIR) {
    return;
  }

  const normalized = target.replaceAll('\\', '/');
  if (!normalized.endsWith('/domains/leonardobrasil.com.br/public_html/brasa')) {
    throw new Error(`Destino inesperado para o Brasa: ${target}`);
  }
}

if (!(await exists(sourceDir))) {
  console.info('[Brasa deploy] dist/brasa nao encontrado; nada para sincronizar.');
  process.exit(0);
}

assertSafeTarget(targetDir);

if (process.platform === 'win32' && !process.env.BRASA_SUBDOMAIN_PUBLIC_DIR) {
  console.info('[Brasa deploy] fora da Hostinger; sincronizacao do subdominio ignorada.');
  process.exit(0);
}

await mkdir(targetDir, { recursive: true });
await cp(sourceDir, targetDir, { recursive: true, force: true });
console.info(`[Brasa deploy] dist/brasa sincronizado em ${targetDir}.`);
