import React from 'react';
import { useCurrentFrame, useVideoConfig, Audio, staticFile } from 'remotion';
import { BackgroundAtmosphere } from './components/BackgroundAtmosphere';
import { SingerHero } from './components/SingerHero';
import { SmallCassette } from './components/SmallCassette';
import { CassetteTitleBadge } from './components/CassetteTitleBadge';
import { AudioSpectrum } from './components/AudioSpectrum';
import { PashtoLyrics } from './components/PashtoLyrics';
import { CameraMotionController } from './components/CameraMotionController';
import { IntroOutro } from './components/IntroOutro';
import { ChannelLogo } from './components/ChannelLogo';
import { useAudioAnalysis } from './utils/audioAnalyzer';
import { PROJECT_CONFIG } from './config/projectConfig';
import './styles/fonts.css';

export const HakimCassetteVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const { media } = PROJECT_CONFIG;

  const fontBahijNazanin = staticFile('fonts/Bahij Nazanin-Regular.ttf');
  const fontRegular = staticFile('fonts/NotoNaskhArabic-Regular.ttf');
  const fontMedium = staticFile('fonts/NotoNaskhArabic-Medium.ttf');
  const fontBold = staticFile('fonts/NotoNaskhArabic-Bold.ttf');

  // Real Audio Reactivity (Media Utils live analysis + precomputed high-precision STFT fallback)
  const audioFrame = useAudioAnalysis(frame, fps, media.audioSrc, 36);
  const { energy, bass, pulse, bands } = audioFrame;

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#04060b',
        overflow: 'hidden',
        fontFamily: "'Bahij Nazanin', 'Noto Naskh Arabic Local', 'Noto Naskh Arabic', sans-serif",
      }}
    >
      {/* 1. Bundled Custom Pashto Font (Bahij Nazanin) + Fallback Font Provisioning */}
      <style>{`
        @font-face {
          font-family: 'Bahij Nazanin';
          src: url('${fontBahijNazanin}') format('truetype');
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: 'Noto Naskh Arabic Local';
          src: url('${fontRegular}') format('truetype');
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: 'Noto Naskh Arabic Local';
          src: url('${fontMedium}') format('truetype');
          font-weight: 500;
          font-style: normal;
        }
        @font-face {
          font-family: 'Noto Naskh Arabic Local';
          src: url('${fontBold}') format('truetype');
          font-weight: 700;
          font-style: normal;
        }
      `}</style>

      {/* 2. Genuine Audio Soundtrack */}
      <Audio src={media.audioSrc} />

      {/* 3. Audio-Reactive Virtual Camera System (Full scene motion with black-border protection) */}
      <CameraMotionController
        frame={frame}
        energy={energy}
        bass={bass}
        pulse={pulse}
      >
        {/* Layer A-G: Blackish Atmospheric Blurred Backdrop & Subtle Night Sky Dust */}
        <BackgroundAtmosphere frame={frame} energy={energy} bass={bass} />

        {/* PRIMARY VISUAL FOCUS: Singer Hero Portrait with Golden Back Glow (Left Side) */}
        <SingerHero frame={frame} bass={bass} energy={energy} />

        {/* BESIDE SINGER: Navy-and-Gold Transparent Cassette with English Name Only & 3D Float */}
        <SmallCassette
          frame={frame}
          totalFrames={durationInFrames}
          energy={energy}
          bass={bass}
          pulse={pulse}
        />

        {/* BELOW CASSETTE: Glassmorphic Gold Title Badge (غمچنې سترګې سندره) */}
        <CassetteTitleBadge
          frame={frame}
          bass={bass}
          pulse={pulse}
        />

        {/* Note: Upper-right duplicate branding REMOVED per user instructions */}

        {/* RIGHT / CENTER-RIGHT: Stylish Gold/Amber Audio Spectrum */}
        <AudioSpectrum bands={bands} energy={energy} bass={bass} />

        {/* RIGHT / CENTER-RIGHT: Synchronized Pashto Lyrics (Bahij Nazanin Font & RTL shaping) */}
        <PashtoLyrics frame={frame} />
      </CameraMotionController>

      {/* Broadcast Channel Logo Watermark (Bottom-Left) */}
      <ChannelLogo />

      {/* 4. Cinematic Intro Banner, Reveal & Outro Transitions */}
      <IntroOutro frame={frame} totalFrames={durationInFrames} />
    </div>
  );
};
