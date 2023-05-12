import React from 'react';
import {
  AudioPlayerForwardButton,
  AudioPlayerPlaybackSpeedControl,
  AudioPlayerPlayPauseButton,
  AudioPlayerReplayButton,
  AudioPlayerSeekBar,
  AudioPlayerTimeDisplay,
  Button,
  calculateTime,
  Stack
} from 'newskit';
import {
  ButtonContainer,
  ScrollTextContainer,
  CollapseButton,
  ExpandedContainer,
  FullWidthRow,
  EmptyBlock
} from '../styles';
import { ScrollingText } from './scrolltext';

type StickyPlayerExpandedProps = {
  handleClickPlayPause: () => void;
  setIsExpanded: (value: boolean) => void;
  narrator: string;
  headline: string;
};

export const StickyPlayerExpanded: React.FC<StickyPlayerExpandedProps> = ({
  headline,
  narrator,
  handleClickPlayPause,
  setIsExpanded
}) => {
  return (
    <ExpandedContainer flow="vertical-center" stackDistribution="center">
      <CollapseButton
        overrides={{ stylePreset: 'collapseButton' }}
        onClick={() => setIsExpanded(false)}
        aria-label="Minimise"
      />
      <ScrollTextContainer marginBlockEnd="space020">
        <ScrollingText>{`${headline} - ${narrator}`}</ScrollingText>
      </ScrollTextContainer>
      <AudioPlayerSeekBar
        overrides={{ slider: { track: { size: 'sizing010' } } }}
      />
      <FullWidthRow flow="horizontal-center" stackDistribution="space-between">
        <AudioPlayerTimeDisplay
          format={({ currentTime }) => calculateTime(currentTime)}
          overrides={{ typographyPreset: 'utilityLabel020' }}
        />
        <AudioPlayerTimeDisplay
          format={({ duration }) => calculateTime(duration)}
          overrides={{ typographyPreset: 'utilityLabel020' }}
        />
      </FullWidthRow>
      <FullWidthRow flow="horizontal-center" stackDistribution="space-between">
        <EmptyBlock>&nbsp;</EmptyBlock>
        <Stack flow="horizontal-center">
          <ButtonContainer>
            <AudioPlayerReplayButton />
          </ButtonContainer>
          <ButtonContainer marginInline="space010">
            <AudioPlayerPlayPauseButton onClick={handleClickPlayPause} />
          </ButtonContainer>
          <ButtonContainer>
            <AudioPlayerForwardButton />
          </ButtonContainer>
        </Stack>
        <AudioPlayerPlaybackSpeedControl useModal>
          <Button
            overrides={{ stylePreset: 'buttonOutlinedSecondary' }}
            size="small"
          >
            Speed
          </Button>
        </AudioPlayerPlaybackSpeedControl>
      </FullWidthRow>
    </ExpandedContainer>
  );
};
