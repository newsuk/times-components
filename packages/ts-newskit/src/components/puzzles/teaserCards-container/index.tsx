import React from 'react';
import { GridLayout, GridLayoutItem } from 'newskit';
import { StyledTitleBar, GridItemWithDivider } from './styles';
import { CategoryCard } from '../categoryCard';
import SudokusIcon from '../../../assets/Sudokus';
import CrosswordsIcon from '../../../assets/Crosswords';
import WordPuzzlesIcon from '../../../assets/WordPuzzles';
import NumbersAndLogicIcon from '../../../assets/NumbersAndLogic';
import QuizzesAndTeasersIcon from '../../../assets/QuizzesAndTeasers';
import BoardAndCardGamesIcon from '../../../assets/BoardAndCardGames';

interface TeaserCardsContainerProps {
  types: string[];
  title?: string;
}

type IconComponent = React.FC;

const iconMapping: Record<string, IconComponent> = {
  Sudokus: SudokusIcon,
  Crosswords: CrosswordsIcon,
  'Word Puzzles': WordPuzzlesIcon,
  'Numbers And Logic': NumbersAndLogicIcon,
  'Quizzes And Teasers': QuizzesAndTeasersIcon,
  'Board And Card Games': BoardAndCardGamesIcon
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