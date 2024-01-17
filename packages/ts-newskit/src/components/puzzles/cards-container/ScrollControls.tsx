import React from 'react';
import { Stack, IconButton, Button } from 'newskit';
import { NewskitIconBack, NewskitIconForward } from '../../../assets';
import {
  TrackingContext,
  TrackingContextProvider
} from '../../../utils/TrackingContextProvider';

interface ScrollControlsProps {
  scrollRef: React.RefObject<HTMLDivElement>;
  cardRef: React.RefObject<HTMLDivElement>;
  seeAllLink?: string;
  sectionTitle?: string;
}

const clickEvent = (puzzleType: string, nextPrev: string) => ({
  action: 'Clicked',
  attrs: {
    event_navigation_action: 'navigation',
    event_navigation_name: `puzzle ${nextPrev} button clicked`,
    event_navigation_browsing_method: 'click',
    article_parent_name: `${puzzleType}`
  }
});

export const ScrollControls = ({
  scrollRef,
  seeAllLink,
  cardRef,
  sectionTitle
}: ScrollControlsProps) => {
  const controlsHandler = (
    fireAnalyticsEvent: (evt: TrackingContext) => void,
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
      fireAnalyticsEvent &&
        fireAnalyticsEvent(clickEvent(clickableSectionTitle, eventDirection));
    }
  };
  return (
    <TrackingContextProvider>
      {({ fireAnalyticsEvent }) => (
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
            onClick={() =>
              controlsHandler(fireAnalyticsEvent, 'left', sectionTitle)
            }
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
            onClick={() =>
              controlsHandler(fireAnalyticsEvent, 'right', sectionTitle)
            }
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
      )}
    </TrackingContextProvider>
  );
};
