import React, { FC } from 'react';
import {
  HeroBannerContainer,
  StyledStack,
  StyledDivider,
  StyledTextBlock,
  StyledHeroIconContainer,
  SyledUnorderedList,
  StyledHeroBannerKillerSudoku,
  StyledHeroBannerQuintagram,
  StyledHeroBannerSuko,
  StyledHeroBannerWordPuzzle,
  StyledIconWrapper,
  MainIconContainer
} from './styles';
import {
  NewsKitBoardAndCardGamesIcon,
  NewsKitCrosswordsIcon,
  NewsKitHeroBannerBackground,
  NewsKitNumbersAndLogicIcon,
  NewsKitQuizzesAndTeasersIcon,
  NewsKitSudokusIcon,
  NewsKitWordPuzzlesIcon
} from '../../../assets';
import { Button, TextBlock, Block } from 'newskit';

export type PuzzleType =
  | 'crossword'
  | 'sudoku'
  | 'word-puzzles'
  | 'numbers-and-logic'
  | 'quizzes-and-teasers'
  | 'board-and-card-games';

type IconComponent = React.ComponentType;

export interface HeroBannerProps {
  puzzleName: string;
  puzzleType: PuzzleType;
  loginUrl: string;
}

const iconMapping: Record<PuzzleType, IconComponent> = {
  sudoku: () => <NewsKitSudokusIcon width={200} height={200} />,
  crossword: () => <NewsKitCrosswordsIcon width={200} height={200} />,
  'word-puzzles': () => <NewsKitWordPuzzlesIcon width={200} height={200} />,
  'numbers-and-logic': () => (
    <NewsKitNumbersAndLogicIcon width={200} height={200} />
  ),
  'quizzes-and-teasers': () => (
    <NewsKitQuizzesAndTeasersIcon width={200} height={200} />
  ),
  'board-and-card-games': () => (
    <NewsKitBoardAndCardGamesIcon width={200} height={200} />
  )
};

export const HeroBanner: FC<HeroBannerProps> = ({
  puzzleName,
  loginUrl,
  puzzleType
}) => {
  const Icon = iconMapping[puzzleType];

  return (
    <HeroBannerContainer paddingBlockStart="space100" paddingInline="space090">
      <StyledStack
        flow="horizontal-center"
        stackDistribution="space-between"
        marginBlockEnd="space080"
        spaceInline={{ xl: 'space100', lg: 'space100' }}
      >
        <Block>
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
              'Play thousands of puzzles and crosswords',
              'Read up to 30 articles per month on The Times & Sunday Times',
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
        </Block>
        <StyledHeroIconContainer>
          <StyledIconWrapper>
            <NewsKitHeroBannerBackground />
            <StyledHeroBannerKillerSudoku />
            <StyledHeroBannerQuintagram />
            <StyledHeroBannerSuko />
            <StyledHeroBannerWordPuzzle />
          </StyledIconWrapper>
          <MainIconContainer>
            <Icon />
          </MainIconContainer>
        </StyledHeroIconContainer>
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
