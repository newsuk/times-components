import React from 'react';
import {
  AudioPlayerPlaybackSpeedControl,
  AudioPlayerPlayPauseButton,
  AudioPlayerSeekBar,
  AudioPlayerTimeDisplay,
  AudioPlayerVolumeControl,
  Block,
  Button,
  calculateTime,
  IconButton,
  Stack
} from 'newskit';
// tslint:disable-next-line
import { IconOutlinedClose } from 'newskit/cjs/icons';
import { AudioSeekBarContainer, ButtonContainer } from '../styles';

type StickyPlayerDesktopProps = {
  handleClickPlayPause: () => void;
  setShowStickyPlayer: (value: boolean) => void;
};

export const StickyPlayerDesktop: React.FC<StickyPlayerDesktopProps> = ({
  handleClickPlayPause,
  setShowStickyPlayer
}) => {
  return (
    <Stack flow="horizontal-center" stackDistribution="center">
      <ButtonContainer marginInlineEnd="space020">
        <AudioPlayerPlayPauseButton
          onClick={handleClickPlayPause}
          overrides={{ stylePreset: 'iconButtonMinimalPrimary' }}
        />
      </ButtonContainer>
      <AudioPlayerVolumeControl
        layout="horizontal"
        overrides={{
          slider: {
            track: { length: '85px' }
          }
        }}
      />
      <Block marginInlineStart="space020">
        <AudioPlayerTimeDisplay
          format={({ currentTime }) => calculateTime(currentTime)}
          overrides={{ typographyPreset: 'utilityLabel020' }}
        />
      </Block>
      <AudioSeekBarContainer marginInline="space040">
        <AudioPlayerSeekBar
          overrides={{ slider: { track: { size: 'sizing010' } } }}
        />
      </AudioSeekBarContainer>
      <Block marginInlineEnd="space050">
        <AudioPlayerTimeDisplay
          format={({ duration }) => calculateTime(duration)}
          overrides={{ typographyPreset: 'utilityLabel020' }}
        />
      </Block>
      <AudioPlayerPlaybackSpeedControl>
        <Button
          overrides={{ stylePreset: 'buttonOutlinedSecondary' }}
          size="small"
        >
          Speed
        </Button>
      </AudioPlayerPlaybackSpeedControl>
      <ButtonContainer marginInlineStart="space080">
        <IconButton
          size="medium"
          onClick={() => setShowStickyPlayer(false)}
          overrides={{ stylePreset: 'iconButtonMinimalPrimary' }}
          aria-label="Close"
          data-testid="CloseBtnDesktop"
        >
          <IconOutlinedClose />
        </IconButton>
      </ButtonContainer>
    </Stack>
  );
};
