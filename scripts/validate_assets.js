const fs = require('fs');
const path = require('path');

console.log('=== Validating Project Assets & Infrastructure ===');

const requiredFiles = [
  { path: 'public/hakim_portrait.png', desc: 'Singer transparent PNG portrait' },
  { path: 'public/ghamjani_stargi.mp3', desc: 'Original master audio track' },
  { path: 'public/Extracted_CapCut_Pashto_Subtitles.srt', desc: 'Pashto SRT subtitles' },
  { path: 'public/fonts/NotoNaskhArabic-Regular.ttf', desc: 'Regular Pashto font' },
  { path: 'public/fonts/NotoNaskhArabic-Medium.ttf', desc: 'Medium Pashto font' },
  { path: 'public/fonts/NotoNaskhArabic-Bold.ttf', desc: 'Bold Pashto font' },
  { path: 'src/config/audioAnalysis.json', desc: 'Precomputed audio analysis STFT' },
  { path: 'src/config/subtitles.json', desc: 'Precomputed verified subtitles' },
  { path: 'src/config/projectConfig.ts', desc: 'Centralized project configuration' },
];

let allPassed = true;

for (const item of requiredFiles) {
  const fullPath = path.resolve(__dirname, '..', item.path);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    console.log(`✔ [EXISTS] ${item.desc}: ${item.path} (${(stats.size / 1024).toFixed(1)} KB)`);
  } else {
    console.error(`✖ [MISSING] ${item.desc}: ${item.path} NOT FOUND!`);
    allPassed = false;
  }
}

if (!allPassed) {
  console.error('\nERROR: One or more required project assets are missing.');
  process.exit(1);
}

console.log('\n✔ All required assets verified successfully.');
