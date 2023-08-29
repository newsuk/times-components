import React from 'react';
import { AudioPlayerPlayPauseButton, IconButton, Stack } from 'newskit';
// tslint:disable-next-line
import { IconOutlinedClose } from 'newskit/cjs/icons';
import { ButtonContainer, ScrollTextContainer } from '../styles';
import { ScrollingText } from './scrolltext';

export type StickyPlayerMobProps = {
  handleClickPlayPause: () => void;
  setShowStickyPlayer: (value: boolean) => void;
  setIsExpanded: (value: boolean) => void;
  narrator: string;
  headline: string;
  isPlaying: boolean;
};

export const StickyPlayerMob: React.FC<StickyPlayerMobProps> = ({
  headline,
  narrator,
  handleClickPlayPause,
  setShowStickyPlayer,
  setIsExpanded,
  isPlaying
}) => {
  return (
    <>
      <Stack flow="horizontal-center" stackDistribution="center">
        <ScrollTextContainer onClick={() => setIsExpanded(true)}>
          <ScrollingText>{`${headline} - ${narrator}`}</ScrollingText>
        </ScrollTextContainer>
        <ButtonContainer marginInlineStart="space020">
          <AudioPlayerPlayPauseButton
            onClick={handleClickPlayPause}
            overrides={{ stylePreset: 'iconButtonMinimalPrimary' }}
            data-testid={
              isPlaying ? 'audio-player-pause-btn' : 'audio-player-play-btn'
            }
          />
        </ButtonContainer>
        <ButtonContainer marginInlineStart="space020">
          <IconButton
            size="medium"
            onClick={() => setShowStickyPlayer(false)}
            overrides={{ stylePreset: 'iconButtonMinimalPrimary' }}
            aria-label="Close"
          >
            <IconOutlinedClose />
          </IconButton>
        </ButtonContainer>
      </Stack>
    </>
  );
};
