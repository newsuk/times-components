import {
  AudioPlayerComposable,
  AudioPlayerPlayPauseButton,
  Block,
  Stack,
  TextBlock,
  useBreakpointKey,
  Visible
} from 'newskit';
import React, { useEffect, useRef, useState } from 'react';
import { Feedback } from '../feedback';
import { StickyPlayerDesktop } from './sticky-player/stickyplayer.desktop';
import { StickyPlayerExpanded } from './sticky-player/stickyplayer.expanded';
import { StickyPlayerMob } from './sticky-player/stickyplayer.mob';
import { StickyAudioPlayer, StickyAudioPlayerContainer } from './styles';

type FeedbackProps = {
  requestFeedback: boolean;
  feedbackMessage: string;
  thankyouMessage: string;
};
export interface InArticleAudioProps {
  src: string;
  playingText?: string;
  readyToPlayText?: string;
  narrator: string;
  headline: string;
  feedback?: FeedbackProps;
}

export const InArticleAudio = ({
  src,
  readyToPlayText = 'Listen to article',
  playingText = 'Playing',
  narrator,
  headline,
  feedback
}: InArticleAudioProps) => {
  const [isPlayed, setIsPlayed] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showStickyPlayer, setShowStickyPlayer] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const audioRef = useRef<HTMLDivElement>(null);
  const breakpoint = useBreakpointKey();

  const pausedText = isPlayed ? 'Paused' : readyToPlayText;
  const playButtonSize = breakpoint === 'xs' ? 'small' : 'medium';

  const handleClickPlayPause = () => {
    !isPlayed && setIsPlayed(true);
    !isPlayed && setShowStickyPlayer(true);
    setIsPlaying(!isPlaying);
  };

  useEffect(
    () => {
      const checkIfClickedOutside = (e: any) => {
        if (
          isExpanded &&
          audioRef.current &&
          !audioRef.current.contains(e.target)
        ) {
          setIsExpanded(!isExpanded);
        }
      };

      document.addEventListener('click', checkIfClickedOutside);

      return () => {
        document.removeEventListener('click', checkIfClickedOutside);
      };
    },
    [isExpanded]
  );

  return (
    <Block ref={audioRef}>
      <AudioPlayerComposable src={src}>
        <Stack flow="horizontal-center" marginBlock="space040">
          <AudioPlayerPlayPauseButton
            onClick={handleClickPlayPause}
            size={playButtonSize}
          />
          <Block marginInlineStart="space020">
            <TextBlock
              typographyPreset="utilityHeading010"
              marginBlockEnd="space020"
            >
              {isPlaying ? playingText : pausedText}
            </TextBlock>
            <TextBlock typographyPreset="utilityBody010">
              {`Narrated by ${narrator}`}
            </TextBlock>
          </Block>
        </Stack>

        {isPlayed &&
          feedback &&
          feedback.requestFeedback && (
            <Feedback
              feedbackMessage={feedback.feedbackMessage}
              message={feedback.thankyouMessage}
            />
          )}

        {showStickyPlayer && (
          <StickyAudioPlayerContainer>
            <StickyAudioPlayer>
              <Visible xs sm>
                <StickyPlayerMob
                  {...{
                    headline,
                    narrator,
                    setShowStickyPlayer,
                    setIsExpanded,
                    handleClickPlayPause
                  }}
                />
                {isExpanded && (
                  <StickyPlayerExpanded
                    {...{
                      headline,
                      narrator,
                      setIsExpanded,
                      handleClickPlayPause
                    }}
                  />
                )}
              </Visible>
              <Visible md lg xl>
                <StickyPlayerDesktop
                  {...{ handleClickPlayPause, setShowStickyPlayer }}
                />
              </Visible>
            </StickyAudioPlayer>
          </StickyAudioPlayerContainer>
        )}
      </AudioPlayerComposable>
    </Block>
  );
};
