import React from 'react';
import { Block, GridLayout, Divider } from 'newskit';
import { BottomArticleStack, BottomStackProps } from './bottom-stack';
import { FullWidthBlock } from '../../components/slices/shared-styles/index';
import { ClickHandlerType, expirableFlagsProps } from '../types';

export interface GroupedArticleProps {
  contentType?: string;
  label?: string;
  expirableFlags?: expirableFlagsProps[];
  articles: BottomStackProps[];
  clickHandler: ClickHandlerType;
}

export const GroupedBottomArticle = ({
  articles,
  clickHandler
}: GroupedArticleProps) => {
  const modifiedGroupedArticles = articles.map(article => ({
    ...article,
    hasTopBorder: false,
    headlineTypographyPreset: {
      xs: 'editorialHeadline030',
      md: 'editorialHeadline020'
    },
    hideImage: true
  }));

  return (
    <Block>
      <GridLayout>
        {modifiedGroupedArticles.map(
          (article: BottomStackProps, articleIndex: number) => {
            const isSecondDivider = articleIndex === 1;
            return (
              <React.Fragment key={article.headline}>
                {isSecondDivider && (
                  <FullWidthBlock
                    marginBlock="space040"
                    paddingInline={{
                      xs: 'space045',
                      md: 'space000'
                    }}
                  >
                    <Divider
                      overrides={{
                        stylePreset: 'dashedDivider'
                      }}
                    />
                  </FullWidthBlock>
                )}
                <BottomArticleStack
                  article={article}
                  clickHandler={clickHandler}
                />
              </React.Fragment>
            );
          }
        )}
      </GridLayout>
    </Block>
  );
};
