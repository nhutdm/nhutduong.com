import { execSync } from 'child_process';
import { version } from '../../package.json';

export async function GET() {
  const commit = execSync('git rev-parse --short HEAD').toString().trim();
  const buildTime = new Date().toISOString();
  const versionMetadata = { commit, version, buildTime };
  return new Response(JSON.stringify(versionMetadata));
}
