import { useCallback, useEffect, useRef, useState } from "react";

const preferenceKey = "my-wedding:audio";

export const useAudio = (source: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeFrameRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = new Audio(source);
    audio.loop = true;
    audio.preload = "none";
    audio.volume = 0;
    audioRef.current = audio;
    return () => {
      if (fadeFrameRef.current !== null) cancelAnimationFrame(fadeFrameRef.current);
      audio.pause();
      audioRef.current = null;
    };
  }, [source]);

  const fadeTo = useCallback((target: number, onComplete?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    const step = () => {
      const difference = target - audio.volume;
      if (Math.abs(difference) < 0.025) {
        audio.volume = target;
        onComplete?.();
        return;
      }
      audio.volume = Math.max(0, Math.min(1, audio.volume + difference * 0.16));
      fadeFrameRef.current = requestAnimationFrame(step);
    };
    if (fadeFrameRef.current !== null) cancelAnimationFrame(fadeFrameRef.current);
    fadeFrameRef.current = requestAnimationFrame(step);
  }, []);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !available) return;
    if (enabled) {
      fadeTo(0, () => audio.pause());
      sessionStorage.setItem(preferenceKey, "off");
      setEnabled(false);
      return;
    }
    try {
      await audio.play();
      fadeTo(0.32);
      sessionStorage.setItem(preferenceKey, "on");
      setEnabled(true);
    } catch {
      setAvailable(false);
    }
  }, [available, enabled, fadeTo]);

  return { enabled, available, toggle };
};

