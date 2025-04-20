// scripts/generate-manifests.js

const fs   = require('fs');
const path = require('path');

// Usage: node generate-manifests.js <version>
const version = process.argv[2];
if (!version) {
  console.error('Version argument missing. Usage: node generate-manifests.js <version>');
  process.exit(1);
}

const port       = 4201;
const localUrl   = `http://localhost:${port}/v${version}/remoteEntry.js`;
const prodBase   = 'https://d24sj5sfeucquy.cloudfront.net';
const prodUrl    = `${prodBase}/v${version}/remoteEntry.js`;

const outDir     = path.resolve(__dirname, '..', `dist/tasks_mfe/v${version}`);
const assetsDir  = path.join(outDir, 'assets');

// Make sure assets folder exists
fs.mkdirSync(assetsDir, { recursive: true });

// Prepare manifest objects
const localManifest = { remoteEntry: localUrl, version };
const prodManifest  = { remoteEntry: prodUrl,  version };

// Write them out
fs.writeFileSync(
  path.join(assetsDir, 'mf.manifest.local.json'),
  JSON.stringify(localManifest, null, 2)
);
console.log(`✔ Wrote local manifest: ${assetsDir}/mf.manifest.local.json`);

fs.writeFileSync(
  path.join(assetsDir, 'mf.manifest.prod.json'),
  JSON.stringify(prodManifest, null, 2)
);
console.log(`✔ Wrote prod manifest: ${assetsDir}/mf.manifest.prod.json`);
