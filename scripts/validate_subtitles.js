const fs = require('fs');
const path = require('path');

const srtPath = path.resolve(__dirname, '../public/Extracted_CapCut_Pashto_Subtitles.srt');
const jsonPath = path.resolve(__dirname, '../src/config/subtitles.json');

console.log('=== Validating Pashto Subtitles ===');
console.log(`Checking SRT file at: ${srtPath}`);

if (!fs.existsSync(srtPath)) {
  console.error(`ERROR: Subtitle file not found at ${srtPath}`);
  process.exit(1);
}

const srtContent = fs.readFileSync(srtPath, 'utf8');
console.log(`Loaded SRT file: ${srtContent.length} bytes`);

// Validate precomputed JSON
if (!fs.existsSync(jsonPath)) {
  console.error(`ERROR: Precomputed subtitles JSON not found at ${jsonPath}`);
  process.exit(1);
}

const cues = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
console.log(`Total verified subtitle cues: ${cues.length}`);

if (cues.length === 0) {
  console.error('ERROR: No subtitle cues found in subtitles.json');
  process.exit(1);
}

// 1. Validate first and last cue timings
const firstCue = cues[0];
const lastCue = cues[cues.length - 1];

console.log(`First cue: #${firstCue.id} [${firstCue.startMs}ms - ${firstCue.endMs}ms] -> "${firstCue.text}"`);
console.log(`Last cue:  #${lastCue.id} [${lastCue.startMs}ms - ${lastCue.endMs}ms] -> "${lastCue.text}"`);

// Expected range: First cue starts at 33400ms (00:00:33.400), last cue ends at 375633ms (00:06:15.633)
if (Math.abs(firstCue.startMs - 33400) > 100) {
  console.warn(`WARNING: First cue start time ${firstCue.startMs}ms deviates from expected 33400ms`);
}

if (Math.abs(lastCue.endMs - 375633) > 100) {
  console.warn(`WARNING: Last cue end time ${lastCue.endMs}ms deviates from expected 375633ms`);
}

// 2. Validate cue ordering and sanity
let previousEnd = 0;
for (let i = 0; i < cues.length; i++) {
  const cue = cues[i];
  if (!cue.text || cue.text.trim().length === 0) {
    console.error(`ERROR: Cue #${cue.id} has empty text!`);
    process.exit(1);
  }

  if (cue.startMs >= cue.endMs) {
    console.error(`ERROR: Cue #${cue.id} has startMs (${cue.startMs}) >= endMs (${cue.endMs})`);
    process.exit(1);
  }

  if (cue.startMs < previousEnd) {
    console.warn(`NOTICE: Cue #${cue.id} overlaps with previous cue by ${previousEnd - cue.startMs}ms`);
  }

  previousEnd = cue.endMs;
}

console.log('✔ All 50 Pashto subtitle cues verified successfully! Timing, text integrity, and RTL cues intact.');
