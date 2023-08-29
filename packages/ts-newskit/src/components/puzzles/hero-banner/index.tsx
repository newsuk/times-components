import React, { FC } from 'react';
import {
  HeroBannerContainer,
  StyledStack,
  StyledWrapper,
  StyledDivider,
  StyledTextBlock,
  StyledCrosswordIconWrapper,
  SyledUnorderedList
} from './styles';
import { NewsKitCrosswordIcon } from '../../../assets';
import { Button, TextBlock } from 'newskit';

export interface HeroBannerProps {
  puzzleName: string;
  loginUrl: string;
}

export const HeroBanner: FC<HeroBannerProps> = ({ puzzleName, loginUrl }) => {
  return (
    <HeroBannerContainer paddingBlockStart="space100" paddingInline="space090">
      <StyledStack
        flow="horizontal-center"
        stackDistribution="space-between"
        marginBlockEnd="space080"
      >
        <StyledWrapper>
          <TextBlock
            as="h2"
            typographyPreset={{
              xs: 'editorialHeadline050',
              md: 'editorialHeadline080'
            }}
            stylePreset="inkContrast"
            marginBlockEnd="space080"
          >
            Play the Times {puzzleName}
          </TextBlock>
          <SyledUnorderedList
            overrides={{
              marker: {
                size: 'iconSize005',
                spaceInline: 'space020',
                stylePreset: 'inkBase'
              },
              spaceStack: 'space040',
              content: {
                typographyPreset: {
                  xs: 'editorialSubheadline020',
                  sm: 'editorialSubheadline030'
                }
              }
            }}
          >
            {[
              'Play thousands of the Times Puzzles',
              'Read up to 30 articles per month on The Times',
              'Just £1 for your first month, then £4.99 a month thereafter'
            ]}
          </SyledUnorderedList>
          <Button
            size="medium"
            href="https://www.thetimes.co.uk/checkout?pc=PUZ025N3Z00"
            overrides={{
              stylePreset: 'freeTrialShadowBtn',
              typographyPreset: 'utilityButton020',
              paddingBlock: 'space030',
              paddingInline: 'space040',
              marginBlock: 'space045',
              minWidth: {
                xs: '100%',
                sm: '227px'
              },
              height: 'sizing.sizing050'
            }}
          >
            Subscribe
          </Button>
        </StyledWrapper>
        <StyledCrosswordIconWrapper>
          <NewsKitCrosswordIcon />
        </StyledCrosswordIconWrapper>
      </StyledStack>
      <StyledDivider />

      <StyledTextBlock
        as="span"
        typographyPreset="utilityBody020"
        stylePreset="inkContrast"
        marginBlock="space080"
      >
        Already a subscriber? <a href={loginUrl}>Log In</a>
      </StyledTextBlock>
    </HeroBannerContainer>
  );
};
