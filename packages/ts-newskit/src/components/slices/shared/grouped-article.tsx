import React from 'react';
import { Block, GridLayout } from 'newskit';
import { LeadArticle, LeadArticleProps } from '../lead-article/index';
import { FullWidthBlock } from '../shared-styles/index';
import { StyledDivider } from '../../../slices/lead-story-1/styles';
import { ClickHandlerType } from '../../../slices/types';

export interface GroupedArticleProps {
  contentType?: string;
  articleLabel?: string;
  expirableFlag?: string;
  articles: LeadArticleProps[];
  clickHandler: ClickHandlerType;
}

export const GroupedArticle = ({
  articles,
  clickHandler
}: GroupedArticleProps) => {
  const modifiedGroupedArticles = articles.map(article => ({
    ...article,
    hasTopBorder: false,
    headlineTypographyPreset: 'editorialHeadline020',
    hideImage: true
  }));

  return (
    <Block>
      <GridLayout>
        {modifiedGroupedArticles.map(
          (article: LeadArticleProps, articleIndex: number) => {
            const isSecondDivider = articleIndex === 1;
            return (
              <React.Fragment key={article.headline}>
                {isSecondDivider && (
                  <FullWidthBlock marginBlock="space040">
                    <StyledDivider
                      overrides={{
                        stylePreset: 'dashedDivider'
                      }}
                    />
                  </FullWidthBlock>
                )}
                <LeadArticle article={article} clickHandler={clickHandler} />
              </React.Fragment>
            );
          }
        )}
      </GridLayout>
    </Block>
  );
};
