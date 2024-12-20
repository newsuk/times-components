import React, { FC, useState } from 'react';
import {
  StickyNoteBox,
  StickyNoteHeader,
  Title,
  StickyNoteBody,
  Label,
  Info,
  MoreLink,
  StickyNotePointer,
  CloseButton
} from './styles';
import { AudioCloseIcon } from '@times-components/icons';
export interface StickyNoteProps {
  title: string;
  betaFlag?: boolean;
  copy: string;
  feedbackLink?: string;
  LearnMoreLink?: string;
  position?: { top: number; left: number };
  pointerLeftOffset?: number;
  cookieValue?: string;
}

export const StickyNote: FC<StickyNoteProps> = ({
  title,
  betaFlag,
  copy,
  feedbackLink,
  LearnMoreLink,
  position = { top: 0, left: 10 },
  pointerLeftOffset = 0,
  cookieValue
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);

    cookieValue ? setCookie(cookieValue, 'true', 7) : '';
  };

  if (!isVisible) {
    return null;
  }

  const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Expiration date
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  };

  return (
    <StickyNoteBox
      style={{
        top: position.top,
        left: position.left
      }}
    >
      <StickyNotePointer
        data-testid="sticky-note-pointer"
        style={{
          left: pointerLeftOffset - 15
        }}
      />
      <StickyNoteHeader>
        <Title>{title}</Title>
        <CloseButton onClick={handleClose}>
          <AudioCloseIcon fill="black" />
        </CloseButton>
      </StickyNoteHeader>
      <StickyNoteBody>
        {betaFlag ? <Label>Beta</Label> : ''}
        <Info>
          {copy}{' '}
          {feedbackLink ? (
            <a href={`mailto:${feedbackLink}`}>{feedbackLink}</a>
          ) : (
            ''
          )}
        </Info>
        {LearnMoreLink ? (
          <MoreLink href={LearnMoreLink}>Learn more</MoreLink>
        ) : (
          ''
        )}
      </StickyNoteBody>
    </StickyNoteBox>
  );
};

export default StickyNote;
