import React from 'react';
import { Stack, IconButton, Button } from 'newskit';
import { NewskitIconBack, NewskitIconForward } from '../../../assets';

interface ScrollControlsProps {
  scrollRef: React.RefObject<HTMLDivElement>;
  cardRef: React.RefObject<HTMLDivElement>;
  seeAllLink?: string;
  title: string;
  onScrollArrowClick: (title: string, direction: 'previous' | 'next') => void;
}

export const ScrollControls = ({
  scrollRef,
  seeAllLink,
  cardRef,
  title,
  onScrollArrowClick
}: ScrollControlsProps) => {
  const controlsHandler = (scrollDirection: 'left' | 'right') => {
    const scrollElement = scrollRef.current;
    const cardElement = cardRef.current;
    if (scrollElement && cardElement) {
      if (scrollDirection === 'left') {
        onScrollArrowClick(title, 'previous');
        scrollElement.scrollLeft =
          scrollElement.scrollLeft - cardElement.offsetWidth - 30;
      }
      if (scrollDirection === 'right') {
        onScrollArrowClick(title, 'next');
        scrollElement.scrollLeft =
          scrollElement.scrollLeft + cardElement.offsetWidth + 30;
      }
    }
  };
  return (
    <Stack flow="horizontal-center">
      {seeAllLink && (
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
      )}
      <IconButton
        overrides={{
          stylePreset: 'iconButtonOutlinedSecondary',
          marginInlineEnd: 'space030',
          paddingInline: 'space020',
          paddingBlock: 'space020'
        }}
        onClick={() => controlsHandler('left')}
        data-testid="scroll-left"
        aria-label="scroll left"
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
        aria-label="scroll right"
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
