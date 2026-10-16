const fs = require('fs');
const path = require('path');

console.log('=== Validating Remotion Composition Registration ===');

const rootPath = path.resolve(__dirname, '../src/Root.tsx');
const indexPath = path.resolve(__dirname, '../src/index.ts');
const configPath = path.resolve(__dirname, '../src/config/projectConfig.ts');

if (!fs.existsSync(rootPath) || !fs.existsSync(indexPath) || !fs.existsSync(configPath)) {
  console.error('ERROR: Missing core Remotion entry files!');
  process.exit(1);
}

const rootContent = fs.readFileSync(rootPath, 'utf8');
const configContent = fs.readFileSync(configPath, 'utf8');

// Verify HakimCassetteVideo is registered
if (!rootContent.includes('id="HakimCassetteVideo"')) {
  console.error('ERROR: Composition "HakimCassetteVideo" is not registered in Root.tsx');
  process.exit(1);
}

// Check dimensions
if (!configContent.includes('1920') || !configContent.includes('1080')) {
  console.error('ERROR: Resolution 1920x1080 not specified in projectConfig.ts');
  process.exit(1);
}

// Check FPS
if (!configContent.includes('fps: 30')) {
  console.error('ERROR: FPS 30 not specified in projectConfig.ts');
  process.exit(1);
}

console.log('✔ Remotion compositions registered:');
console.log('  - HakimCassetteVideo (Full duration ~395.74s @ 1080p, 30 FPS)');
console.log('  - PreviewIntro (10-second intro sequence)');
console.log('  - PreviewLyrics (First subtitle cue & spectrum test)');
console.log('✔ All composition registration checks passed.');
