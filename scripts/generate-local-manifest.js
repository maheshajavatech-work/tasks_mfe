// scripts/generate-local-manifest.js
const fs   = require('fs');
const path = require('path');

// args: [node, script, version]
const version = process.argv[2];
if (!version) {
  console.error('Usage: node generate-local-manifest.js <version>');
  process.exit(1);
}

const port = 4201;
const outDir    = path.resolve(__dirname, '..', `dist/tasks_mfe/v${version}`);
const assetsDir = path.join(outDir, 'assets');
const manifest  = {
  remoteEntry: `http://localhost:${port}/v${version}/remoteEntry.js`,
  version
};

// ensure assets folder
fs.mkdirSync(assetsDir, { recursive: true });
// write the manifest
fs.writeFileSync(
  path.join(assetsDir, 'mf.manifest.local.json'),
  JSON.stringify(manifest, null, 2)
);
console.log(`✔️  Wrote local manifest to ${assetsDir}/mf.manifest.local.json`);
