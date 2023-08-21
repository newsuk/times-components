import React from 'react';
import { StyledTextBlock } from '../shared-styles';

export interface LiveTagProps {
  liveTag?: string;
}

export const LiveTag = ({ liveTag }: LiveTagProps) => {
  const hasLiveTag = liveTag && liveTag !== '';

  if (!hasLiveTag) {
    return null;
  }

  return (
    <StyledTextBlock
      typographyPreset="customArticleTileInfoPreset"
      paddingInline="space010"
      paddingBlock="space010"
      as="span"
    >
      {liveTag}
    </StyledTextBlock>
  );
};
