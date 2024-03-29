import {
  AudioPlayerComposable,
  AudioPlayerPlayPauseButton,
  Block,
  Stack,
  TextBlock,
  Visible
} from 'newskit';
import React, { useEffect, useRef, useState } from 'react';
import { Feedback } from './feedback';
import { StickyPlayerDesktop } from './sticky-player/stickyplayer.desktop';
import { StickyPlayerExpanded } from './sticky-player/stickyplayer.expanded';
import { StickyPlayerMob } from './sticky-player/stickyplayer.mob';
import {
  AudioPlayerContainer,
  StickyAudioPlayer,
  StickyAudioPlayerContainer
} from './styles';

type FeedbackProps = {
  requestFeedback: boolean;
  feedbackMessage: string;
  thankyouMessage: string;
};
export interface InArticleAudioProps {
  showAudioPlayer?: boolean;
  src: string;
  playingText?: string;
  readyToPlayText?: string;
  narrator: string;
  headline: string;
  feedback?: FeedbackProps;
}

export const InArticleAudio = ({
  showAudioPlayer,
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

  const pausedText = isPlayed ? 'Paused' : readyToPlayText;

  const handleClickPlayPause = () => {
    !isPlayed && setIsPlayed(true);
    !showStickyPlayer && setShowStickyPlayer(true);
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
    <AudioPlayerContainer
      ref={audioRef}
      className={[
        'article-audio-container',
        showAudioPlayer ? 'opShow_articleAudio' : 'opHide_articleAudio'
      ].join(' ')}
    >
      <AudioPlayerComposable src={src}>
        <Stack flow="horizontal-center" marginBlock="space040">
          <AudioPlayerPlayPauseButton
            onClick={handleClickPlayPause}
            overrides={{
              height: {
                xs: 'sizing060',
                sm: 'sizing080'
              },
              width: {
                xs: 'sizing060',
                sm: 'sizing080'
              },
              iconSize: {
                xs: 'sizing040',
                sm: 'sizing050'
              }
            }}
            data-testid={
              isPlaying ? 'audio-player-pause-btn' : 'audio-player-play-btn'
            }
          />
          <Block marginInlineStart="space020">
            <TextBlock
              typographyPreset="utilityHeading010"
              marginBlockEnd="space020"
            >
              {isPlaying ? playingText : pausedText}
            </TextBlock>
            <TextBlock
              typographyPreset="utilityBody010"
              className="article-audio-narrator"
            >
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
                    handleClickPlayPause,
                    isPlaying
                  }}
                />
                {isExpanded && (
                  <StickyPlayerExpanded
                    {...{
                      headline,
                      narrator,
                      setIsExpanded,
                      isPlaying,
                      handleClickPlayPause
                    }}
                  />
                )}
              </Visible>
              <Visible md lg xl>
                <StickyPlayerDesktop
                  {...{ handleClickPlayPause, setShowStickyPlayer, isPlaying }}
                />
              </Visible>
            </StickyAudioPlayer>
          </StickyAudioPlayerContainer>
        )}
      </AudioPlayerComposable>
    </AudioPlayerContainer>
  );
};
