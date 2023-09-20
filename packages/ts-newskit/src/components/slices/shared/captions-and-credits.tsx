import { TextBlock } from 'newskit';
import React from 'react';
import { StyledSpan } from '../shared-styles';
import { ImageProps } from '../lead-article/index';

export const CaptionsAndCredits = ({
  images,
  hasCaption
}: {
  images?: ImageProps;
  hasCaption?: boolean;
}) => {
  if (!images) {
    return null;
  }
  return (
    <TextBlock
      marginBlockStart="space020"
      stylePreset="inkSubtle"
      typographyPreset="editorialCaption010"
    >
      {images.caption}
      <StyledSpan hasCaption={hasCaption}>{images.credits}</StyledSpan>
    </TextBlock>
  );
};
