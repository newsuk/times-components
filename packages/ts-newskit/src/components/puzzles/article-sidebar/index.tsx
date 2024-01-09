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
import { TrackingContextProvider } from '@times-components/ts-components/src/helpers/tracking/TrackingContextProvider';
import analyticsStream from '@times-components/ts-components/src/fixtures/analytics-actions/analytics-actions';

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
  return (
    <TrackingContextProvider
      analyticsStream={analyticsStream}
      context={{
        object: 'ArticleSidebar',
        attrs: {
          component_type: 'Puzzle Sidebar',
          event_navigation_action: 'navigation',
          component_name: `Article Sidebar`
        }
      }}
    >
      {({ intersectObserverRef, fireAnalyticsEvent }) => (
        <Block stylePreset="sidebarCard" paddingBlockStart="space030">
          <Block>
            <Block>
              <StyledCardComposable
                overrides={{
                  marginBlockEnd: 'space030',
                  stylePreset: 'cardTitleIcon'
                }}
                ref={intersectObserverRef}
              >
                <CardLink
                  className="trigger"
                  external={false}
                  expand
                  href={pageLink}
                  onClick={() => {
                    fireAnalyticsEvent({
                      attrs: {
                        event_navigation_name:
                          'puzzle sidebar: header selected',
                        component_name: 'Article Sidebar',
                        event_navigation_browsing_method: 'click'
                      }
                    });
                  }}
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
                  onClick={() => {
                    fireAnalyticsEvent({
                      attrs: {
                        event_navigation_name:
                          'puzzle sidebar: puzzle selected',
                        component_name: 'Article Sidebar',
                        event_navigation_browsing_method: 'click'
                      }
                    });
                  }}
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
