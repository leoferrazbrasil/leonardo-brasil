import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

const distIndexPath = path.resolve(process.cwd(), 'dist', 'index.html');

if (!existsSync(distIndexPath)) {
  execSync('npm run build', { stdio: 'inherit' });
}
