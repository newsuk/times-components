export interface StickyAudioPlayerProps {
  src: string;
  title?: string;
  autoPlay?: boolean;
  initialVolume?: number;
  playbackRate?: number;
  isPlayingProp?: boolean;
  isExpandedProp?: boolean;
  allowTogglePlay?: boolean;
  allowSeek?: boolean;
  allowVolumeChange?: boolean;
  allowPlaybackRateChange?: boolean;
  allowExpandCollapse?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  onVolumeChange?: (volume: number) => void;
  onPlaybackRateChange?: (rate: number) => void;
  onSeek?: (time: number) => void;
}

export interface CollapseIconProps {
  isExpanded: boolean;
  toggleExpand: () => void;
  allowExpandCollapse: boolean;
}

export interface TitleScrollerProps {
  title: string;
}

export interface SeekBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  allowSeek: boolean;
}

export interface TimeDisplayProps {
  currentTime: number;
  duration: number;
}

export interface PlaybackControlsProps {
  isPlaying: boolean;
  togglePlayPause: () => void;
  rewind: () => void;
  forward: () => void;
  speed: number;
  onSpeedChange: (rate: number) => void;
  allowTogglePlay: boolean;
  allowSeek: boolean;
  allowPlaybackRateChange: boolean;
  isSpeedModalOpen: boolean;
  setIsSpeedModalOpen: (open: boolean) => void;
}

export interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
  allowVolumeChange: boolean;
}
