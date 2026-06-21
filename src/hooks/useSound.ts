import { useState, useCallback, useEffect } from 'react';

// Using public domain UI sound URLs
const HOVER_SOUND = 'https://actions.google.com/sounds/v1/ui/button_click.ogg';
const TRANSITION_SOUND = 'https://actions.google.com/sounds/v1/science_fiction/shield_force_field_hum.ogg';

// Global state so sound toggle persists across components
let globalSoundEnabled = false;
let subscribers: ((enabled: boolean) => void)[] = [];

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

  return { soundEnabled, toggleSound, playHover, playTransition };
};
