import React, { FC } from 'react';
import { StoryCard, StoryCardProps } from '../storyCard';
import { GridLayout } from 'newskit';
import { StyledTitleBar } from './styles';

export interface StoryCardListingProps {
  articles: StoryCardProps[];
  sectionTitle: string;
}

export const StoryCardListing: FC<StoryCardListingProps> = ({
  articles,
  sectionTitle
}) => {
  return (
    <>
      <StyledTitleBar
        headingAs="h2"
        overrides={{
          paddingBlock: {
            xs: 'space040',
            lg: 'space050'
          },
          paddingInline: 'space000',
          heading: {
            typographyPreset: {
              xs: 'editorialDisplay002',
              md: 'editorialDisplay003',
              lg: 'editorialDisplay004'
            },
            stylePreset: 'inkBrand010'
          }
        }}
        data-testid="title-bar"
      >
        {sectionTitle}
      </StyledTitleBar>
      <GridLayout
        columns={{ xs: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }}
        columnGap={{ md: 'space050', xl: 'space060' }}
      >
        {articles.map((article: StoryCardProps, articleIndex) => (
          <StoryCard
            key={article.title}
            {...article}
            imgHiddenMobile={articleIndex > 0 ? true : false}
            mobileDivider={articleIndex > 0 ? true : false}
            hiddenMobile={articleIndex > 2 ? true : false}
          />
        ))}
      </GridLayout>
    </>
  );
};
