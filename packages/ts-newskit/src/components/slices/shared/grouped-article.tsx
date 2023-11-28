import React from 'react';
import { Block, GridLayout, Divider } from 'newskit';
import { LeadArticle, LeadArticleProps } from '../lead-article/index';
import { FullWidthBlock } from '../shared-styles/index';
import { ClickHandlerType, expirableFlagsProps } from '../../../slices/types';

export interface GroupedArticleProps {
  contentType?: string;
  label?: string;
  expirableFlags?: expirableFlagsProps[];
  articles: LeadArticleProps[];
  clickHandler: ClickHandlerType;
}

export const GroupedArticle = ({
  articles,
  clickHandler,
}: GroupedArticleProps) => {
  const modifiedGroupedArticles = articles.map((article) => ({
    ...article,
    hasTopBorder: false,
    headlineTypographyPreset: {
      xs: 'editorialHeadline030',
      md: 'editorialHeadline020',
    },
    hideImage: true,
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
                  <FullWidthBlock
                    marginBlock="space040"
                    paddingInline={{
                      xs: 'space045',
                      md: 'space000',
                    }}
                  >
                    <Divider
                      overrides={{
                        stylePreset: 'dashedDivider',
                      }}
                    />
                  </FullWidthBlock>
                )}
                <LeadArticle article={article} clickHandler={clickHandler} />
              </React.Fragment>
            );
          },
        )}
      </GridLayout>
    </Block>
  );
};
