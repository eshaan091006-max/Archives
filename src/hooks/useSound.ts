import { useState, useCallback, useEffect } from 'react';

// Using public domain UI sound URLs
const HOVER_SOUND = 'https://actions.google.com/sounds/v1/ui/button_click.ogg';
const TRANSITION_SOUND =
  'https://actions.google.com/sounds/v1/science_fiction/shield_force_field_hum.ogg';

export interface Track {
  name: string;
  theme: string;
  url: string;
}

export const TRACKS: Track[] = [
  { name: 'Storm Ambient', theme: '2023', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { name: 'Festive Beat', theme: '2024', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { name: 'Cosmic Symphony', theme: '2025', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
];

// Global background music and Web Audio API state
let globalSoundEnabled = false;
let globalVolume = 0.15;
let globalTrackIndex = 0;

let subscribers: ((enabled: boolean) => void)[] = [];
let volumeSubscribers: ((vol: number) => void)[] = [];
let trackSubscribers: ((idx: number) => void)[] = [];

let globalAudioContext: AudioContext | null = null;
let globalAnalyser: AnalyserNode | null = null;
let globalBgMusic: HTMLAudioElement | null = null;
let globalSource: MediaElementAudioSourceNode | null = null;

const initAudio = () => {
  if (typeof window === 'undefined') return;

  if (!globalBgMusic) {
    globalBgMusic = new Audio();
    globalBgMusic.crossOrigin = 'anonymous';
    globalBgMusic.src = TRACKS[globalTrackIndex].url;
    globalBgMusic.loop = true;
    globalBgMusic.volume = globalVolume;
  }

  if (!globalAudioContext) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      try {
        globalAudioContext = new AudioContextClass();
        globalAnalyser = globalAudioContext.createAnalyser();
        globalAnalyser.fftSize = 64; // Small size is ideal for navbar visualizer bars

        globalSource = globalAudioContext.createMediaElementSource(globalBgMusic);
        globalSource.connect(globalAnalyser);
        globalAnalyser.connect(globalAudioContext.destination);
      } catch (err) {
        console.error('Failed to initialize AudioContext:', err);
      }
    }
  }

  if (globalAudioContext && globalAudioContext.state === 'suspended') {
    globalAudioContext.resume().catch(err => console.warn('Could not resume AudioContext:', err));
  }
};

export const useSound = () => {
  const [soundEnabled, setSoundEnabled] = useState(globalSoundEnabled);
  const [volume, setVolumeState] = useState(globalVolume);
  const [trackIndex, setTrackIndexState] = useState(globalTrackIndex);

  useEffect(() => {
    const handler = (state: boolean) => setSoundEnabled(state);
    subscribers.push(handler);

    const volHandler = (v: number) => setVolumeState(v);
    volumeSubscribers.push(volHandler);

    const trackHandler = (idx: number) => setTrackIndexState(idx);
    trackSubscribers.push(trackHandler);

    return () => {
      subscribers = subscribers.filter(s => s !== handler);
      volumeSubscribers = volumeSubscribers.filter(s => s !== volHandler);
      trackSubscribers = trackSubscribers.filter(s => s !== trackHandler);
    };
  }, []);

  const toggleSound = useCallback(() => {
    const newState = !soundEnabled;
    globalSoundEnabled = newState;

    try {
      if (newState) {
        initAudio();
        if (globalBgMusic) {
          globalBgMusic.play().catch(err => console.warn('Autoplay prevented music:', err));
        }
      } else {
        if (globalBgMusic) {
          globalBgMusic.pause();
        }
      }
    } catch (e) {
      console.error(e);
    }

    subscribers.forEach(s => s(newState));
  }, [soundEnabled]);

  const changeVolume = useCallback((newVol: number) => {
    globalVolume = newVol;
    if (globalBgMusic) {
      globalBgMusic.volume = newVol;
    }
    volumeSubscribers.forEach(s => s(newVol));
  }, []);

  const changeTrack = useCallback((newIdx: number) => {
    globalTrackIndex = newIdx;
    if (globalBgMusic) {
      const isPlaying = !globalBgMusic.paused;
      globalBgMusic.src = TRACKS[newIdx].url;
      if (isPlaying && globalSoundEnabled) {
        globalBgMusic.play().catch(err => console.warn(err));
      }
    }
    trackSubscribers.forEach(s => s(newIdx));
  }, [soundEnabled]);

  const playHover = useCallback(() => {
    if (!soundEnabled) return;
    const audio = new Audio(HOVER_SOUND);
    audio.volume = 0.1;
    audio.play().catch(() => {});
  }, [soundEnabled]);

  const playTransition = useCallback(() => {
    if (!soundEnabled) return;
    const audio = new Audio(TRANSITION_SOUND);
    audio.volume = 0.2;
    audio.play().catch(() => {});
  }, [soundEnabled]);

  return {
    soundEnabled,
    toggleSound,
    volume,
    changeVolume,
    trackIndex,
    changeTrack,
    playHover,
    playTransition,
    analyser: globalAnalyser,
  };
};

