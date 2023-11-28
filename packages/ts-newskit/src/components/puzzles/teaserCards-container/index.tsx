import React from 'react';
import { GridLayout, GridLayoutItem } from 'newskit';
import { StyledTitleBar } from './styles';
import { CategoryCard } from '../categoryCard';
import {
  NewsKitSudokusIcon,
  NewsKitCrosswordsIcon,
  NewsKitWordPuzzlesIcon,
  NewsKitNumbersAndLogicIcon,
  NewsKitQuizzesAndTeasersIcon,
  NewsKitBoardAndCardGamesIcon,
} from '../../../assets';

type PuzzleType =
  | 'Crosswords'
  | 'Sudokus'
  | 'Word Puzzles'
  | 'Numbers And Logic'
  | 'Quizzes And Teasers'
  | 'Board And Card Games';
type IconComponent = React.ComponentType;

interface TeaserCardsContainerProps {
  types: PuzzleType[];
  title?: string;
}

const iconMapping: Record<PuzzleType, IconComponent> = {
  Sudokus: () => (
    <NewsKitSudokusIcon className="puzzle-icon" width={75} height={75} />
  ),
  Crosswords: () => (
    <NewsKitCrosswordsIcon className="puzzle-icon" width={75} height={75} />
  ),
  'Word Puzzles': () => (
    <NewsKitWordPuzzlesIcon className="puzzle-icon" width={75} height={75} />
  ),
  'Numbers And Logic': () => (
    <NewsKitNumbersAndLogicIcon
      className="puzzle-icon"
      width={75}
      height={75}
    />
  ),
  'Quizzes And Teasers': () => (
    <NewsKitQuizzesAndTeasersIcon
      className="puzzle-icon"
      width={75}
      height={75}
    />
  ),
  'Board And Card Games': () => (
    <NewsKitBoardAndCardGamesIcon
      className="puzzle-icon"
      width={75}
      height={75}
    />
  ),
};

export const TeaserCardsContainer = ({
  types,
  title,
}: TeaserCardsContainerProps) => {
  return (
    <>
      <StyledTitleBar
        headingAs="h2"
        overrides={{
          paddingBlock: {
            xs: 'space050',
            lg: 'space070',
          },
          paddingInline: 'space000',
          heading: {
            typographyPreset: 'editorialHeadline040',
            stylePreset: 'inkBrand010',
          },
        }}
        data-testid="title-bar"
      >
        {title}
      </StyledTitleBar>
      <GridLayout
        columns={{
          xs: 'repeat(2, 1fr)',
          md: 'repeat(6, 1fr)',
        }}
        columnGap={{
          xs: 'space050',
          md: 'space040',
          lg: 'space050',
          xl: 'space060',
        }}
      >
        {types.map((type, __) => (
          <GridLayoutItem data-testid="single-card">
            <CategoryCard
              type={type}
              url="https://www.thetimes.co.uk/checkout?pc=PUZ025N3Z00"
              Icon={iconMapping[type]}
            />
          </GridLayoutItem>
        ))}
      </GridLayout>
    </>
  );
};
