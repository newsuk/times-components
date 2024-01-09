import React, { FC } from 'react';
import {
  TextBlock,
  Block,
  CardComposable,
  CardMedia,
  CardContent,
  CardLink,
  Divider,
  Stack,
  IconButton
} from 'newskit';
import { NewsKitChevronRightIcon } from '../../../assets';
import { Puzzle } from './types';
import { StyledCardComposable } from './styles';
import {
  TrackingContext,
  TrackingContextProvider
} from '../../../utils/TrackingContextProvider';
import analyticsStream from '../../../components/navigation/fixtures/analytics-actions';

export interface ArticleSideBarProps {
  sectionTitle: string;
  data: Puzzle[];
  pageLink: string;
}

export const ArticleSidebar: FC<ArticleSideBarProps> = ({
  sectionTitle,
  data,
  pageLink
}) => {
  const clickEvent = (title: string) => ({
    action: 'Clicked',
    object: 'ArticleSidebar',
    attrs: {
      event_navigation_action: 'navigation',
      event_navigation_browsing_method: 'click',
      event_navigation_name: `${title}`,
      component_name: 'Article Sidebar'
    }
  });

  const handleClick = (
    fireAnalyticsEvent: (evt: TrackingContext) => void,
    title: string
  ) => {
    fireAnalyticsEvent && fireAnalyticsEvent(clickEvent(title));
  };

  return (
    <TrackingContextProvider analyticsStream={analyticsStream}>
      {({ fireAnalyticsEvent }) => (
        <Block stylePreset="sidebarCard" paddingBlockStart="space030">
          <Block>
            <Block>
              <StyledCardComposable
                overrides={{
                  marginBlockEnd: 'space030',
                  stylePreset: 'cardTitleIcon'
                }}
              >
                <CardLink
                  className="trigger"
                  external={false}
                  expand
                  href={pageLink}
                  onClick={() =>
                    handleClick(
                      fireAnalyticsEvent,
                      'puzzle sidebar: header selected'
                    )
                  }
                />
                <Stack
                  flow="horizontal-center"
                  stackDistribution="space-between"
                >
                  <TextBlock as="h3" typographyPreset="editorialDisplay002">
                    {sectionTitle}
                  </TextBlock>

                  <IconButton
                    overrides={{
                      stylePreset: 'iconPreset',
                      width: 'sizing050',
                      height: 'sizing050'
                    }}
                  >
                    <NewsKitChevronRightIcon />
                  </IconButton>
                </Stack>
              </StyledCardComposable>

              <TextBlock
                as="p"
                marginBlockEnd="space030"
                stylePreset="inkBase"
                typographyPreset="utilityBody010"
              >
                Challenge yourself with today’s puzzles.
              </TextBlock>
            </Block>
          </Block>
          <Divider
            overrides={{
              marginBlock: 'space040',
              stylePreset: 'dashedDivider'
            }}
          />

          {data.map(({ title, url, imgUrl }) => (
            <React.Fragment key={title}>
              <CardComposable
                columns="0fr 1fr"
                overrides={{
                  stylePreset: 'transparentCard',
                  marginBlockStart: 'space040'
                }}
                areas={`
           media content          
         `}
              >
                <CardMedia
                  media={{
                    src: imgUrl,
                    width: '40px',
                    alt: 'Puzzle thumbnail',
                    placeholderIcon: true,
                    overrides: {
                      marginInlineEnd: 'space040',
                      maxWidth: 'initial'
                    }
                  }}
                />
                <CardLink
                  className="trigger-card-link"
                  external={false}
                  expand
                  href={url}
                  onClick={() =>
                    handleClick(
                      fireAnalyticsEvent,
                      'puzzle sidebar: puzzle selected'
                    )
                  }
                />
                <CardContent alignItems="center">
                  <TextBlock typographyPreset="editorialSubheadline010">
                    {title}
                  </TextBlock>
                </CardContent>
              </CardComposable>
              <Divider
                overrides={{
                  marginBlock: 'space040',
                  stylePreset: 'dashedDivider'
                }}
              />
            </React.Fragment>
          ))}
        </Block>
      )}
    </TrackingContextProvider>
  );
};
