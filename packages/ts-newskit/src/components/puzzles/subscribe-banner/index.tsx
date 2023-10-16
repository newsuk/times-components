import React, { FC } from 'react';
import { Block, TextBlock, Button } from 'newskit';
import {
  SubscribeBannerContainer,
  StyledBlock,
  StyledIconSubscribeB,
  StyledIconSubscribe3,
  StyledIconSubscribeQuestion
} from './styles';

export interface SubscribeBannerProps {
  SubscribeBannerHeader: string;
  SubscribeBannerSubheadline: string;
  url: string;
  title: string;
}

export const SubscribeBanner: FC<SubscribeBannerProps> = ({
  SubscribeBannerHeader,
  SubscribeBannerSubheadline,
  url,
  title
}) => {
  return (
    <Block as="section">
      <SubscribeBannerContainer
        paddingBlock="space050"
        paddingInline="space050"
      >
        <StyledBlock marginBlock="space000" marginInline="auto">
          <Block>
            <TextBlock
              as="h2"
              typographyPreset={{
                xs: 'editorialHeadline040',
                md: 'editorialHeadline050'
              }}
              stylePreset="inkContrast"
            >
              {SubscribeBannerHeader}
            </TextBlock>
            <TextBlock
              as="p"
              typographyPreset={{
                xs: 'editorialSubheadline010',
                md: 'editorialSubheadline020'
              }}
              stylePreset="inkBase"
              marginBlockStart={{
                xs: 'space045',
                md: 'space050'
              }}
            >
              {SubscribeBannerSubheadline}
            </TextBlock>
            <Button
              size="medium"
              href={url}
              overrides={{
                stylePreset: 'freeTrialShadowBtn',
                typographyPreset: 'utilityButton020',
                paddingBlock: 'space030',
                paddingInline: 'space040',
                marginBlockStart: {
                  xs: 'space050',
                  md: 'space070'
                },
                minWidth: {
                  xs: '167px',
                  lg: '199px'
                },
                height: 'sizing.sizing050'
              }}
            >
              {title}
            </Button>
          </Block>
        </StyledBlock>
        <StyledIconSubscribe3 />
        <StyledIconSubscribeB />
        <StyledIconSubscribeQuestion />
      </SubscribeBannerContainer>
    </Block>
  );
};
