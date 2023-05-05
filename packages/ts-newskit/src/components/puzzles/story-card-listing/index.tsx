import React, { FC } from 'react';
import { StoryCard, StoryCardProps } from '../storyCard';
import { GridLayout, TitleBar } from 'newskit';

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
      <TitleBar
        headingAs="h2"
        overrides={{
          stylePreset: 'dashedDivider',
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
      </TitleBar>
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
