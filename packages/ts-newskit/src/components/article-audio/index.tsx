import React, { useEffect, useRef, useState } from 'react';
import {
  AudioPlayerComposable,
  AudioPlayerPlayPauseButton,
  Block,
  Stack,
  TextBlock,
  Visible
} from 'newskit';
import { debounce } from '../../utils';
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
  const submitMsg = (msg: any) => {
    const audioChannel = new BroadcastChannel('tm_persisted_audio');
    audioChannel.postMessage(msg);
  }

  const handleClickPlayPause = () => {
    !isPlayed && setIsPlayed(true);
    !showStickyPlayer && setShowStickyPlayer(true);
    setIsPlaying(!isPlaying);

    submitMsg(!isPlaying ? 'play' : 'pause'); /* send */
    // bc.onmessage = function (ev) { 
    //   console.log(ev);
    // } /* receive */
    
    if (!isPlayed) {
      window.open("http://localhost:8000/interactives/component/persisted-audio", "The Times Audio Tab", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top="+(screen.height-400)+",left="+(screen.width-840));
    }

    // if (audioTab) {
    //   audioTab.document.body.innerHTML = `
    //     <h1>New Audio Tab Player</h1>
    //     <audio controls autoplay>
    //       <source src="https://www.thetimes.co.uk/d/optimizely/james-marriott-alt-top-2.mp3" type="audio/mpeg">
    //     </audio>
    //   `;
    // }
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

      const audioPlayerRef = audioRef.current && audioRef.current.querySelector('audio');
      audioPlayerRef && audioPlayerRef.addEventListener('seeking', debounce(
          () => submitMsg({
            msg: 'seek',
            value: audioPlayerRef.currentTime,
          }),
          100
        )
      );

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
