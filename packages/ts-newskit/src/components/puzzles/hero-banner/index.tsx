import React, { FC } from 'react';
import {
  HeroBannerContainer,
  StyledBlock,
  StyledIconA4,
  StyledIconD2,
  StyledWrapper,
  StyledDivider,
  StyledTextBlock,
  StyledCrosswordIcon
} from './styles';
import { Block, Button, TextBlock, UnorderedList } from 'newskit';

interface HeroBannerProps {
  title: string;
}

export const HeroBanner: FC<HeroBannerProps> = ({ title }) => {
  return (
    <HeroBannerContainer paddingBlockStart="space100" paddingInline="space090">
      <StyledBlock flow="horizontal-center">
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
            Play the times crossword
          </TextBlock>
          <UnorderedList
            overrides={{
              marker: {
                size: 'iconSize005',
                spaceInline: 'space020',
                stylePreset: 'inkBase'
              },
              spaceStack: 'space040',
              content: {
                typographyPreset: 'editorialSubheadline030'
              }
            }}
          >
            {[
              'Play thousands of Times Puzzles',
              'Sudoku, Polygon, Codeword, Lexica and many more',
              'Read up to 30 articles per month on the times.co.uk'
            ]}
          </UnorderedList>
          <Button
            size="medium"
            href="dadada"
            overrides={{
              stylePreset: 'freeTrialShadowBtn',
              typographyPreset: 'utilityButton020',
              paddingBlock: 'space030',
              paddingInline: 'space040',
              marginBlock: 'space045',
              minWidth: {
                xs: '167px',
                lg: '199px'
              },
              height: 'sizing.sizing050'
            }}
          >
            Subscribe
          </Button>
        </StyledWrapper>
        <StyledCrosswordIcon />
      </StyledBlock>
      <StyledDivider />

      <StyledTextBlock
        as="span"
        typographyPreset="utilityBody020"
        stylePreset="inkContrast"
        marginBlock="space080"
      >
        Already a subscriber? <a href="">Log In</a>
      </StyledTextBlock>
      <StyledIconD2 />
      <StyledIconA4 />
    </HeroBannerContainer>
  );
};
