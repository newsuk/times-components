import React, { FC, useState, useRef, useEffect } from 'react';
import { AudioButton, AudioDuration, DurationWrapper } from './styles';
import { AudioPlayer } from '../audio-player-components/AudioPlayer';
import { StickyNote } from '../sticky-note/StickyNote';
import { PlayIcon, PauseIcon } from '@times-components/icons';
import { breakpoints } from '@times-components/ts-styleguide';
export interface ArticleAudioProps {
  audioSrc: string;
}

export const ArticleAudio: FC<ArticleAudioProps> = ({ audioSrc }) => {
  const [audioState, setAudioState] = useState<
    'not-started' | 'playing' | 'paused'
  >('not-started');
  const [isAudioPlayerVisible, setisAudioPlayerVisible] = useState<boolean>(
    false
  );
  const [duration, setDuration] = useState<string | null>(null);
  const [childPosition, setChildPosition] = useState({ top: 0, left: 0 });
  const [childPointerPosition, setchildPointerPosition] = useState({ left: 0 });

  const cookieNarationButton = 'audioNarrationButtonClicked';
  const cookieStickyNote = 'audioNoticeClicked';
  let showNotice = false;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const parentRef = useRef<HTMLButtonElement>(null);

  const StickyNoteFixedWidth = 300;

  const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Expiration date
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  };

  const getCookie = (name: string): string | null => {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookiesArray = decodedCookie.split(';');
    for (const element of cookiesArray) {
      const trimmedCookie = element.trim();
      if (trimmedCookie.indexOf(cookieName) === 0) {
        return trimmedCookie.substring(cookieName.length, trimmedCookie.length);
      }
    }

    return null;
  };

  if (
    getCookie(cookieNarationButton) !== 'true' &&
    getCookie(cookieStickyNote) !== 'true'
  ) {
    showNotice = true;
  }

  const handleShowChild = () => {
    if (parentRef.current) {
      let leftPosition = 10;
      const rect = parentRef.current.getBoundingClientRect();

      /* If on mobile device, move sticky note fully to left because sticky is 100vw wide
         If sticky note overflows left side of screen, adjust it to be inside viewport
      */
      if (
        !(
          window.innerWidth < parseInt(breakpoints.medium, 10) ||
          rect.left + rect.width < 300
        )
      ) {
        leftPosition =
          rect.left + window.scrollX - StickyNoteFixedWidth + rect.width;
      }

      setChildPosition({
        top: rect.top + window.scrollY + 52,
        left: leftPosition
      });

      setchildPointerPosition({
        left: rect.left + rect.width / 2
      });
    }
  };

  useEffect(() => {
    handleShowChild();

    window.addEventListener('resize', handleShowChild);
    return () => {
      window.removeEventListener('resize', handleShowChild);
    };
  }, []);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const totalSeconds = Math.floor(audioRef.current.duration);
      const minutes = Math.floor(totalSeconds / 60) + 1;
      setDuration(`${minutes}`);
    }
  };

  const handlePlayPause = () => {
    setisAudioPlayerVisible(true);

    setCookie(cookieNarationButton, 'true', 365);

    if (audioState === 'playing') {
      setAudioState('paused');
      setisAudioPlayerVisible(false);
    } else {
      setAudioState('playing');
    }
  };

  const hidePlayer = () => {
    setisAudioPlayerVisible(false);
    setAudioState('not-started');
  };

  return (
    <div>
      <audio
        data-testid="article-audio"
        ref={audioRef}
        src={audioSrc}
        onLoadedMetadata={handleLoadedMetadata}
        preload="metadata"
      />
      <AudioButton
        ref={parentRef}
        onClick={handlePlayPause}
        className="article-audio-button"
        style={{
          backgroundColor: audioState !== 'not-started' ? '#1D1D1B' : '#fff',
          color: audioState === 'not-started' ? '#333' : '#fff'
        }}
      >
        {audioState === 'playing' ? (
          <>
            <PauseIcon width={16} height={16} fill="#fff" /> Playing
          </>
        ) : audioState === 'paused' ? (
          <>
            <PlayIcon width={16} height={16} /> Paused
          </>
        ) : (
          <>
            <PlayIcon width={16} height={16} /> Listen
          </>
        )}
        <AudioDuration
          style={{
            color: audioState === 'not-started' ? '#696969' : '#fff'
          }}
        >
          {' '}
          <DurationWrapper>{duration} </DurationWrapper> min
        </AudioDuration>
      </AudioButton>
      {showNotice ? (
        <StickyNote
          title="Listen to articles"
          betaFlag={true}
          copy="You can now listen to articles. Let us know your feedback"
          feedbackLink="userfeedback@the-times.co.uk"
          LearnMoreLink="#"
          position={childPosition}
          pointerLeftOffset={childPointerPosition.left}
          cookieValue={cookieStickyNote}
        />
      ) : (
        ''
      )}

      <div
        data-testid="audioPlayerWrapper"
        style={{
          display: !isAudioPlayerVisible ? 'none' : 'block'
        }}
      >
        <AudioPlayer
          src={audioSrc}
          isPlayingProp={audioState === 'playing'}
          onPlay={() => setAudioState('playing')}
          onPause={() => setAudioState('paused')}
          onEnded={() => hidePlayer()}
          onClose={() => hidePlayer()}
        />
      </div>
    </div>
  );
};

export default ArticleAudio;
