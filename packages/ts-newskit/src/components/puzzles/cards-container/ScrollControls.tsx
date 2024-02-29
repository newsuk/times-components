import React from 'react';
import { Stack, IconButton, Button } from 'newskit';
import { NewskitIconBack, NewskitIconForward } from '../../../assets';
import { puzzleCategoryClickTracking } from '../../../utils/tracking';
import { PuzzleScrollClickHandlerType, MouseEventType } from './types';

interface ScrollControlsProps {
  scrollRef: React.RefObject<HTMLDivElement>;
  cardRef: React.RefObject<HTMLDivElement>;
  seeAllLink?: string;
  sectionTitle?: string;
}

export const ScrollControls = ({
  scrollProps,
  clickHandler
}: {
  scrollProps: ScrollControlsProps,
  clickHandler: PuzzleScrollClickHandlerType
}) => {

  const {
    scrollRef,
    seeAllLink,
    cardRef,
    sectionTitle
  } = scrollProps;

  const controlsHandler = (
    event: MouseEventType,
    scrollDirection: 'left' | 'right',
    clickableSectionTitle: string = 'Puzzles'
  ) => {
    const scrollElement = scrollRef.current;
    const cardElement = cardRef.current;
    const eventDirection = scrollDirection === 'left' ? 'previous' : 'next';
    if (scrollElement && cardElement) {
      if (scrollDirection === 'left') {
        scrollElement.scrollLeft =
          scrollElement.scrollLeft - cardElement.offsetWidth - 30;
      }
      if (scrollDirection === 'right') {
        scrollElement.scrollLeft =
          scrollElement.scrollLeft + cardElement.offsetWidth + 30;
      }

      const puzzleScroll = { nextPrev: eventDirection, puzzleType: clickableSectionTitle };
      puzzleCategoryClickTracking(event, puzzleScroll, clickHandler);

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
        onClick={(event: MouseEventType) =>
          controlsHandler(event, 'left', sectionTitle)
        }
        data-testid="scroll-left"
        aria-label="scroll left"
        href=""
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
        onClick={(event: MouseEventType) =>
          controlsHandler(event, 'right', sectionTitle)
        }
        data-testid="scroll-right"
        aria-label="scroll right"
        href=""
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
