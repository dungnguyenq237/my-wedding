import { weddingConfig } from "../../config/wedding";
import { useAudio } from "../../hooks/useAudio";

export const AudioButton = () => {
  const { enabled, available, toggle } = useAudio(weddingConfig.audio);
  return (
    <button
      type="button"
      className="audio-button"
      onClick={() => {
        void toggle();
      }}
      disabled={!available}
      aria-pressed={enabled}
      aria-label={
        !available
          ? "Ambient music unavailable"
          : enabled
            ? "Turn ambient music off"
            : "Turn ambient music on"
      }
      title={!available ? "Add public/audio/ambient.mp3 to enable music" : undefined}
    >
      <span aria-hidden="true">{enabled ? "♫" : "♪"}</span>
      <span>{available ? (enabled ? "Sound on" : "Sound off") : "No audio"}</span>
    </button>
  );
};
