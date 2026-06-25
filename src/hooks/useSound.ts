import { useState, useCallback, useEffect } from 'react';

// Using public domain UI sound URLs
const HOVER_SOUND = 'https://actions.google.com/sounds/v1/ui/button_click.ogg';
const TRANSITION_SOUND =
  'https://actions.google.com/sounds/v1/science_fiction/shield_force_field_hum.ogg';

// Global background music and Web Audio API state
let globalSoundEnabled = false;
let subscribers: ((enabled: boolean) => void)[] = [];

let globalAudioContext: AudioContext | null = null;
let globalAnalyser: AnalyserNode | null = null;
let globalBgMusic: HTMLAudioElement | null = null;
let globalSource: MediaElementAudioSourceNode | null = null;

const initAudio = () => {
  if (typeof window === 'undefined') return;

  if (!globalBgMusic) {
    globalBgMusic = new Audio();
    globalBgMusic.crossOrigin = 'anonymous';
    globalBgMusic.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    globalBgMusic.loop = true;
    globalBgMusic.volume = 0.15;
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

  useEffect(() => {
    const handler = (state: boolean) => setSoundEnabled(state);
    subscribers.push(handler);
    return () => {
      subscribers = subscribers.filter(s => s !== handler);
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
    playHover,
    playTransition,
    analyser: globalAnalyser,
  };
};

