#!/usr/bin/env node
import { createWriteStream } from 'node:fs';
import { chmodSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { promises as fs } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { execFile } from 'node:child_process';
import https from 'node:https';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { homedir } from 'node:os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..');
const projectDir = resolve(repoRoot, 'godot/truck-town');
const exportDir = resolve(repoRoot, 'static/vibe-rally');
const cacheDir = resolve(repoRoot, '.godot');
const cliDir = resolve(cacheDir, 'cli');
const templateDir = resolve(cacheDir, 'templates');
const version = '4.2.2';
const releaseFileTag = `${version}-stable`;
const templateVersion = `${version}.stable`;

const PLATFORM_MAP = {
  linux: {
    archive: `Godot_v${releaseFileTag}_linux.x86_64.zip`,
    binaryName: `Godot_v${releaseFileTag}_linux.x86_64`
  },
  darwin: {
    archive: `Godot_v${releaseFileTag}_macos.universal.zip`,
    binaryName: `Godot.app/Contents/MacOS/Godot`
  },
  win32: {
    archive: `Godot_v${releaseFileTag}_win64.exe.zip`,
    binaryName: `Godot_v${releaseFileTag}_win64.exe`
  }
};

const platformKey = PLATFORM_MAP[process.platform] ? process.platform : null;

if (process.env.GODOT_SKIP_EXPORT === '1') {
  console.log('[godot] export skipped via GODOT_SKIP_EXPORT');
  process.exit(0);
}

if (!platformKey) {
  console.warn(`[godot] Unsupported platform ${process.platform}; skipping export.`);
  process.exit(0);
}

const binaryInfo = PLATFORM_MAP[platformKey];
const exportTemplatesArchive = `Godot_v${releaseFileTag}_export_templates.tpz`;
const downloadBase = `https://github.com/godotengine/godot/releases/download/${releaseFileTag}`;

async function ensureDirectories() {
  for (const dir of [cacheDir, cliDir, templateDir, exportDir]) {
    await fs.mkdir(dir, { recursive: true });
  }
}

function getSystemTemplateDir() {
  if (process.platform === 'win32') {
    const appData = process.env.APPDATA ?? resolve(homedir(), 'AppData', 'Roaming');
    return resolve(appData, 'Godot', 'export_templates');
  }
  if (process.platform === 'darwin') {
    return resolve(homedir(), 'Library', 'Application Support', 'Godot', 'export_templates');
  }
  return resolve(homedir(), '.local', 'share', 'godot', 'export_templates');
}

async function downloadFile(url, destination) {
  if (existsSync(destination)) {
    return;
  }
  await fs.mkdir(dirname(destination), { recursive: true });
  console.log(`[godot] downloading ${url}`);
  const proxy = process.env.https_proxy ?? process.env.HTTPS_PROXY ?? null;
  const agent = proxy ? new HttpsProxyAgent(proxy) : undefined;
  await new Promise((resolvePromise, rejectPromise) => {
    const request = https.get(url, { agent }, (response) => {
      if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        response.resume();
        const redirected = new URL(response.headers.location, url).toString();
        downloadFile(redirected, destination).then(resolvePromise).catch(rejectPromise);
        return;
      }
      if (response.statusCode !== 200) {
        rejectPromise(new Error(`Failed to download ${url}: status ${response.statusCode}`));
        return;
      }
      const fileStream = createWriteStream(destination);
      pipeline(response, fileStream)
        .then(resolvePromise)
        .catch(async (error) => {
          await fs.rm(destination, { force: true });
          rejectPromise(error);
        });
    });
    request.on('error', async (error) => {
      await fs.rm(destination, { force: true }).catch(() => {});
      rejectPromise(error);
    });
  });
}

async function unzip(archivePath, destinationDir) {
  await fs.mkdir(destinationDir, { recursive: true });
  await new Promise((resolvePromise, rejectPromise) => {
    const unzip = execFile('unzip', ['-oq', archivePath, '-d', destinationDir], (error) => {
      if (error) {
        rejectPromise(error);
      } else {
        resolvePromise();
      }
    });
    unzip.stdout?.pipe(process.stdout);
    unzip.stderr?.pipe(process.stderr);
  });
}

async function ensureGodotBinary() {
  const archivePath = resolve(cliDir, binaryInfo.archive ?? 'godot.zip');
  const binaryPath = resolve(cliDir, binaryInfo.binaryName);

  if (existsSync(binaryPath)) {
    return binaryPath;
  }

  await downloadFile(`${downloadBase}/${binaryInfo.archive}`, archivePath);
  await unzip(archivePath, cliDir);
  if (process.platform !== 'win32') {
    chmodSync(binaryPath, 0o755);
  }
  return binaryPath;
}

async function ensureTemplates() {
  const targetVersionDir = resolve(templateDir, templateVersion);
  const sentinel = resolve(targetVersionDir, 'web_release.zip');
  if (existsSync(targetVersionDir) && existsSync(sentinel)) {
    await syncTemplatesToSystem(targetVersionDir);
    return templateDir;
  }

  const archivePath = resolve(templateDir, exportTemplatesArchive);
  await downloadFile(`${downloadBase}/${exportTemplatesArchive}`, archivePath);
  await unzip(archivePath, templateDir);
  const extractedDir = resolve(templateDir, 'templates');
  if (existsSync(targetVersionDir)) {
    await fs.rm(targetVersionDir, { recursive: true, force: true });
  }
  if (existsSync(extractedDir)) {
    await fs.rename(extractedDir, targetVersionDir);
  }
  await fs.mkdir(targetVersionDir, { recursive: true });
  if (!existsSync(sentinel)) {
    throw new Error('Godot export templates missing after extraction.');
  }
  await syncTemplatesToSystem(targetVersionDir);
  return templateDir;
}

async function syncTemplatesToSystem(sourceDir) {
  const systemBase = getSystemTemplateDir();
  if (!systemBase) {
    return;
  }
  const systemVersionDir = resolve(systemBase, templateVersion);
  await fs.mkdir(systemBase, { recursive: true });
  await fs.rm(systemVersionDir, { recursive: true, force: true });
  await fs.cp(sourceDir, systemVersionDir, { recursive: true });
}

async function runGodotExport(godotBinary, templatesPath) {
  if (existsSync(exportDir)) {
    rmSync(exportDir, { recursive: true, force: true });
  }
  mkdirSync(exportDir, { recursive: true });

  const env = {
    ...process.env,
    GODOT_TEMPLATES_DIR: templatesPath,
    GODOT4_TEMPLATES_DIR: templatesPath
  };

  const outputPath = resolve(exportDir, 'index.html');
  const args = ['--headless', '--path', projectDir, '--export-release', 'Web', outputPath];
  console.log('[godot] exporting Web build…');
  await new Promise((resolvePromise, rejectPromise) => {
    const child = execFile(godotBinary, args, { env, stdio: 'inherit' }, (error) => {
      if (error) {
        rejectPromise(error);
      } else {
        resolvePromise();
      }
    });
  });
}

async function patchExportForSharedArrayBuffer() {
  const htmlPath = resolve(exportDir, 'index.html');
  if (!existsSync(htmlPath)) {
    console.warn('[godot] export HTML missing; skipping cross-origin patch');
    return;
  }

  const html = await fs.readFile(htmlPath, 'utf8');
  if (html.includes('const missingAll = Engine.getMissingFeatures();')) {
    return;
  }

  const newline = html.includes('\r\n') ? '\r\n' : '\n';
  const sentinelRegex = /\tconst missing = Engine\.getMissingFeatures\(\);\r?\n/;
  if (!sentinelRegex.test(html)) {
    console.warn('[godot] unable to locate missing feature check for SharedArrayBuffer patch');
    return;
  }

  const replacement = [
    '\tconst missingAll = Engine.getMissingFeatures();',
    '\tconst missing = missingAll.filter((feature) => {',
    "\t\treturn !feature.startsWith('Cross Origin Isolation') && !feature.startsWith('SharedArrayBuffer');",
    '\t});',
    '\tif (missing.length !== missingAll.length) {',
    "\t\tconsole.warn('Running without SharedArrayBuffer or cross-origin isolation; falling back to single-threaded Godot.');",
    '\t}',
    ''
  ].join(newline);

  const patched = html.replace(sentinelRegex, replacement);
  await fs.writeFile(htmlPath, patched, 'utf8');
  console.log('[godot] patched export to allow non-isolated browsers');
}

(async () => {
  if (!existsSync(projectDir)) {
    console.warn('[godot] no project directory found, skipping export');
    return;
  }

  await ensureDirectories();
  const binaryPath = await ensureGodotBinary();
  const templatesPath = await ensureTemplates();
  await runGodotExport(binaryPath, templatesPath);
  await patchExportForSharedArrayBuffer();
  console.log('[godot] export complete');
})().catch((error) => {
  console.error('[godot] export failed:', error);
  process.exitCode = 1;
});
