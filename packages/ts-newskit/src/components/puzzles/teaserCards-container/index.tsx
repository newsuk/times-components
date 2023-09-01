import React from 'react';
import { GridLayout, GridLayoutItem } from 'newskit';
import { StyledTitleBar, GridItemWithDivider } from './styles';
import { CategoryCard } from '../categoryCard';
import {
  NewsKitSudokusIcon,
  NewsKitCrosswordsIcon,
  NewsKitWordPuzzlesIcon,
  NewsKitNumbersAndLogicIcon,
  NewsKitQuizzesAndTeasersIcon,
  NewsKitBoardAndCardGamesIcon
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
    <NewsKitSudokusIcon className="puzzle-icon" width={120} height={120} />
  ),
  Crosswords: () => (
    <NewsKitCrosswordsIcon className="puzzle-icon" width={120} height={120} />
  ),
  'Word Puzzles': () => (
    <NewsKitWordPuzzlesIcon className="puzzle-icon" width={120} height={120} />
  ),
  'Numbers And Logic': () => (
    <NewsKitNumbersAndLogicIcon
      className="puzzle-icon"
      width={120}
      height={120}
    />
  ),
  'Quizzes And Teasers': () => (
    <NewsKitQuizzesAndTeasersIcon
      className="puzzle-icon"
      width={120}
      height={120}
    />
  ),
  'Board And Card Games': () => (
    <NewsKitBoardAndCardGamesIcon
      className="puzzle-icon"
      width={120}
      height={120}
    />
  )
};

export const TeaserCardsContainer = ({
  types,
  title
}: TeaserCardsContainerProps) => {
  const remainingColumns = (4 - (types.length % 4)) % 4;

  return (
    <>
      <StyledTitleBar
        headingAs="h2"
        overrides={{
          paddingBlock: {
            xs: 'space050',
            lg: 'space070'
          },
          paddingInline: 'space000',
          heading: {
            typographyPreset: 'editorialHeadline040',
            stylePreset: 'inkBrand010'
          }
        }}
        data-testid="title-bar"
      >
        {title}
      </StyledTitleBar>
      <GridLayout
        columns={{
          xs: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)'
        }}
        columnGap={{
          xs: 'space050',
          md: 'space060'
        }}
      >
        {types.map((type, index) => (
          <GridItemWithDivider className={index % 4 === 3 ? 'last-in-row' : ''}>
            <GridLayoutItem data-testid="single-card">
              <CategoryCard
                type={type}
                url="https://www.thetimes.co.uk/checkout?pc=PUZ025N3Z00"
                Icon={iconMapping[type]}
              />
            </GridLayoutItem>
          </GridItemWithDivider>
        ))}

        {/* Empty grid items for dividers */}
        {remainingColumns > 0 &&
          Array.from({ length: remainingColumns }).map((_, index) => (
            <GridItemWithDivider
              className={index === remainingColumns - 1 ? 'last-in-row' : ''}
            />
          ))}
      </GridLayout>
    </>
  );
};
