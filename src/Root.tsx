import React from 'react';
import { Composition } from 'remotion';
import { HakimCassetteVideo } from './HakimCassetteVideo';
import { PROJECT_CONFIG } from './config/projectConfig';

export const Root: React.FC = () => {
  const { dimensions } = PROJECT_CONFIG;

  return (
    <>
      {/* Full 1080p Music Video Composition (Matching genuine music duration: 395.74s) */}
      <Composition
        id="HakimCassetteVideo"
        component={HakimCassetteVideo}
        durationInFrames={dimensions.durationInFrames}
        fps={dimensions.fps}
        width={dimensions.width}
        height={dimensions.height}
      />

      {/* 10-second Intro Preview Snippet (Frames 0 to 300) */}
      <Composition
        id="PreviewIntro"
        component={HakimCassetteVideo}
        durationInFrames={300}
        fps={dimensions.fps}
        width={dimensions.width}
        height={dimensions.height}
      />

      {/* First Subtitle Cue & Spectrum Test Snippet (Frames 980 to 1280) */}
      <Composition
        id="PreviewLyrics"
        component={HakimCassetteVideo}
        durationInFrames={300}
        fps={dimensions.fps}
        width={dimensions.width}
        height={dimensions.height}
      />
    </>
  );
};
