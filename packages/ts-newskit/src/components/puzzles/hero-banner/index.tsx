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
  MainIconContainer,
  StyledBlock,
  StyledSpan
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
  onBtnClick?: () => void;
  onLinkClick?: () => void;
}

const iconMapping: Record<PuzzleType, IconComponent> = {
  sudoku: () => (
    <NewsKitSudokusIcon width={200} height={200} className="iconType" />
  ),
  crossword: () => (
    <NewsKitCrosswordsIcon width={200} height={200} className="iconType" />
  ),
  'word-puzzles': () => (
    <NewsKitWordPuzzlesIcon width={200} height={200} className="iconType" />
  ),
  'numbers-and-logic': () => (
    <NewsKitNumbersAndLogicIcon width={200} height={200} className="iconType" />
  ),
  'quizzes-and-teasers': () => (
    <NewsKitQuizzesAndTeasersIcon
      width={200}
      height={200}
      className="iconType"
    />
  ),
  'board-and-card-games': () => (
    <NewsKitBoardAndCardGamesIcon
      width={200}
      height={200}
      className="iconType"
    />
  )
};

export const HeroBanner: FC<HeroBannerProps> = ({
  puzzleName,
  loginUrl,
  puzzleType,
  onBtnClick,
  onLinkClick
}) => {
  const Icon = iconMapping[puzzleType];

  const handleBtnClick = () => {
    onBtnClick && onBtnClick();
  };

  const handleLinkClick = () => {
    onLinkClick && onLinkClick();
  };

  return (
    <HeroBannerContainer
      paddingBlockStart={{ xs: 'space090', md: 'space080', lg: 'space080' }}
      paddingInline={{ xs: 'space045', md: 'space050', lg: 'space100' }}
    >
      <StyledBlock>
        <StyledStack
          flow={{ md: 'horizontal-top', lg: 'horizontal-center' }}
          stackDistribution="space-between"
          marginBlockEnd={{ xs: 'space070', md: 'space090', lg: 'space080' }}
          // spaceInline={{ xl: 'space100', lg: 'space100' }}
        >
          <Block marginInlineEnd={{ md: 'space070' }}>
            <TextBlock
              as="h2"
              typographyPreset={{
                xs: 'editorialHeadline050',
                md: 'editorialHeadline080'
              }}
              stylePreset="inkContrast"
              marginBlockEnd={{ xs: 'space070', md: 'space060' }}
              marginBlockStart={{ lg: 'space045' }}
            >
              <TextBlock as="span">Play the Times </TextBlock>{' '}
              <StyledSpan as="span">{puzzleName}</StyledSpan>
            </TextBlock>
            <SyledUnorderedList
              overrides={{
                marker: {
                  size: 'iconSize005',
                  spaceInline: 'space020',
                  stylePreset: 'inkDark010'
                },
                spaceStack: 'space050',
                content: {
                  typographyPreset: 'editorialSubheadline020',
                  stylePreset: 'inkDark010'
                }
              }}
            >
              {[
                'Just £1 for your first month, then £4.99 a month thereafter',
                'Play thousands of puzzles and crosswords on our website',
                'Read up to 30 articles per month on thetimes.co.uk'
              ]}
            </SyledUnorderedList>
            <Button
              onClick={handleBtnClick}
              size="medium"
              href="https://www.thetimes.co.uk/checkout?pc=PUZ025N3Z00"
              overrides={{
                stylePreset: 'freeTrialShadowBtn',
                typographyPreset: 'utilityButton020',
                paddingBlock: 'space030',
                paddingInline: 'space040',
                marginBlockStart: 'space040',
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
              <NewsKitHeroBannerBackground className="iconBg" />
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
          marginBlockStart={{ xs: 'space070', sm: 'space060' }}
          marginBlockEnd={{ xs: 'space090', sm: 'space100' }}
        >
          Already a subscriber?{' '}
          <a onClick={handleLinkClick} href={loginUrl}>
            Log In
          </a>
        </StyledTextBlock>
      </StyledBlock>
    </HeroBannerContainer>
  );
};
