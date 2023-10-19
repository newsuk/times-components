import React from 'react';
import { Divider, Hidden, Visible } from 'newskit';
import { Article, ArticleProps } from '../../components/slices/article';
import { ScrollContainer, ArticleDividerXL } from '../shared-styles';
import { clearCreditsAndCaption } from '../../utils/clear-credits-and-caption';
import { ClickHandlerType } from '../types';
import { ArticleGrid } from '../shared-styles/article-stack';

export const ArticleStack = ({
  articles,
  clickHandler,
  isContentBucket3
}: {
  articles: ArticleProps[];
  clickHandler: ClickHandlerType;
  isContentBucket3?: boolean;
}) => {
  const articleLoop = (hideImage?: boolean) =>
    articles.map((article: ArticleProps, articleIndex, articleArr) => {
      const articleBorder = articleIndex < articleArr.length - 1 && (
        <Divider
          aria-label="article-divider-vertical"
          overrides={{ stylePreset: 'lightDivider' }}
          vertical
        />
      );

      return (
        <React.Fragment key={article.id}>
          <Article
            article={{
              ...clearCreditsAndCaption(article),
              hasTopBorder: articleIndex > 0,
              hideImage
            }}
            clickHandler={clickHandler}
          />
          {articleBorder}
        </React.Fragment>
      );
    });

  const articleGrid = (viewport: 'mobile' | 'desktop') => (
    <ArticleGrid
      columns={{
        xs: '170px 1px 170px 1px 170px 1px 170px',
        md: '1fr 1px 1fr 1px 1fr 1px 1fr',
        lg: '1fr',
        xl: '1fr 1fr'
      }}
      style={{ position: 'relative' }}
      columnGap={{ xs: 'space040', xl: 'space060' }}
      rowGap="space040"
      data-testid={`article-container-${viewport}`}
    >
      {articleLoop()}
      <Visible xl>
        <ArticleDividerXL
          overrides={{ stylePreset: 'lightDivider' }}
          vertical
          data-testid="article-stack-large-divider"
        />
      </Visible>
    </ArticleGrid>
  );

  return (
    <>
      <Visible xs sm>
        {isContentBucket3 ? (
          articleLoop(true)
        ) : (
          <ScrollContainer
            overrides={{ overlays: { stylePreset: 'menuScrollOverlay' } }}
            tabIndex={undefined}
          >
            {articleGrid('mobile')}
          </ScrollContainer>
        )}
      </Visible>
      <Hidden xs sm>
        {articleGrid('desktop')}
      </Hidden>
    </>
  );
};
