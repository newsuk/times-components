import React from 'react';
import { Stack, IconButton, Button } from 'newskit';
import { NewskitIconBack, NewskitIconForward } from '../../../assets';

interface ScrollControlsProps {
  scrollRef: React.RefObject<HTMLDivElement>;
  cardRef: React.RefObject<HTMLDivElement>;
  seeAllLink: string;
}

export const ScrollControls = ({
  scrollRef,
  seeAllLink,
  cardRef
}: ScrollControlsProps) => {
  const controlsHandler = (scrollDirection: 'left' | 'right') => {
    const scrollElement = scrollRef.current;
    const cardElement = cardRef.current;
    if (scrollElement && cardElement) {
      if (scrollDirection === 'left') {
        scrollElement.scrollLeft =
          scrollElement.scrollLeft - cardElement.offsetWidth - 30;
      }
      if (scrollDirection === 'right') {
        scrollElement.scrollLeft =
          scrollElement.scrollLeft + cardElement.offsetWidth + 30;
      }
    }
  };
  return (
    <Stack flow="horizontal-center">
      <Button
        href={seeAllLink}
        overrides={{
          stylePreset: 'inkBrand010',
          marginInlineEnd: 'space030',
          typographyPreset: 'utilityLabel010',
          paddingInline: 'space000',
          minWidth: 'unset'
        }}
      >
        SEE ALL
      </Button>
      <IconButton
        overrides={{
          stylePreset: 'iconButtonOutlinedSecondary',
          marginInlineEnd: 'space030',
          paddingInline: 'space020',
          paddingBlock: 'space020'
        }}
        onClick={() => controlsHandler('left')}
        data-testid="scroll-left"
      >
        <NewskitIconBack
          overrides={{
            size: 'iconSize010',
            stylePreset: 'inkBase'
          }}
        />
      </IconButton>
      <IconButton
        overrides={{
          stylePreset: 'iconButtonOutlinedSecondary',
          paddingInline: 'space020',
          paddingBlock: 'space020'
        }}
        onClick={() => controlsHandler('right')}
        data-testid="scroll-right"
      >
        <NewskitIconForward
          overrides={{
            size: 'iconSize010',
            stylePreset: 'inkBase'
          }}
        />
      </IconButton>
    </Stack>
  );
};
