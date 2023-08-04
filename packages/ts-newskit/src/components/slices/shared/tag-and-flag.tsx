import React from 'react';
import { Block, TextBlock, Divider } from 'newskit';
import { ContainerInline, TextLink } from '../shared-styles';
import { TrackingContextProvider, TrackingContext } from '@times-components/ts-components';

export interface TagAndFlagProps {
  flag?: string;
  tag?: {
    label: string;
    href: string;
  };
  marginBlockStart?: string;
}

export const TagAndFlag = ({
  flag,
  tag,
  marginBlockStart = 'space000'
}: TagAndFlagProps) => {
  const hasTag = tag && tag.label;
  const hasFlag = flag && flag !== '';

  if (!hasTag && !hasFlag) {
    return null;
  }

  const clickEvent = () => ({
    action: 'Clicked',
    attrs: {
      event_navigation_action: 'navigation',
      event_navigation_name: 'article category selected',
      event_navigation_browsing_method: 'click',
      article_parent_name: hasTag && tag.label
    }
  });

  const handleClick = (fireAnalyticsEvent: (evt: TrackingContext) => void) => {
    fireAnalyticsEvent && fireAnalyticsEvent(clickEvent());
  };

  return (
    <TrackingContextProvider>
    {({ fireAnalyticsEvent }) => (
    <Block marginBlockStart={marginBlockStart} data-testid="tag-and-flag">
      {tag && (
        <TextLink
          overrides={{
            typographyPreset: 'customTagAndFlagPreset',
            stylePreset: 'inkBrand010'
          }}
          href={tag.href}
          onClick={() => handleClick(fireAnalyticsEvent)}
        >
          {tag.label}
        </TextLink>
      )}

      {tag &&
        Object.keys(tag).length > 0 &&
        tag.label !== '' &&
        flag && (
          <ContainerInline>
            <Divider
              vertical
              overrides={{
                marginInline: 'space020'
              }}
            />
          </ContainerInline>
        )}

      {flag && (
        <TextBlock
          typographyPreset="customTagAndFlagPreset"
          stylePreset="inkSubtle"
          as="span"
        >
          {flag}
        </TextBlock>
      )}
    </Block>
        )}
    </TrackingContextProvider>
  );
};
