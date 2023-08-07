import React from 'react';
import { NewsKitChevronRightIcon } from '../../../assets';
import { Block, FlagSize, IconButton, Stack, TitleBar } from 'newskit';
import {
  TrackingContextProvider,
  TrackingContext
} from '../../../utils/TrackingContextProvider';

export interface SliceHeaderProps {
  title: string;
  href: string;
  titleTypographyPreset?: string;
  iconArrowSize?: string;
  iconSize?: FlagSize;
  padding?: string;
}

export const SliceHeader = ({
  title,
  href,
  titleTypographyPreset = 'editorialDisplay004',
  iconArrowSize = 'iconSize020',
  iconSize = 'medium',
  padding = 'space030'
}: SliceHeaderProps) => {
  const clickEvent = () => ({
    action: 'Clicked',
    attrs: {
      event_navigation_action: 'navigation',
      event_navigation_name: 'title block link',
      event_navigation_browsing_method: 'click',
      article_parent_name: title
    }
  });

  const handleClick = (fireAnalyticsEvent: (evt: TrackingContext) => void) => {
    fireAnalyticsEvent && fireAnalyticsEvent(clickEvent());
  };
  return (
    <TrackingContextProvider
      context={{
        object: 'SliceHeader'
      }}
    >
      {({ fireAnalyticsEvent }) => (
        <Block stylePreset="sliceHeaderPreset">
          <Stack
            flow="horizontal-center"
            stackDistribution="space-between"
            paddingBlock={padding}
          >
            <TitleBar
              overrides={{
                heading: {
                  typographyPreset: titleTypographyPreset,
                  stylePreset: 'inkBrand010'
                },
                paddingInline: 'space000',
                paddingBlock: 'space000'
              }}
            >
              {title}
            </TitleBar>
            <IconButton
              size={iconSize}
              overrides={{
                stylePreset: 'sliceIconPreset',
                iconSize: iconArrowSize
              }}
              role="link"
              href={href}
              onClick={() => handleClick(fireAnalyticsEvent)}
            >
              <NewsKitChevronRightIcon />
            </IconButton>
          </Stack>
        </Block>
      )}
    </TrackingContextProvider>
  );
};
