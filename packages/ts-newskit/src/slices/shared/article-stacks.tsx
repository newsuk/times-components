import React from 'react';
import { Block, BreakpointKeys, Divider, GridLayout, Scroll } from 'newskit';
import { Article, ArticleProps } from '../../components/slices/article';

export const ArticleStackLarge = ({
  articles,
  breakpoint
}: {
  articles: ArticleProps[];
  breakpoint: BreakpointKeys;
}) => {
  const articleGrid = (
    <GridLayout
      columns={{
        xs: '170px 1px 170px 1px 170px 1px 170px 1px 170px',
        md: '1fr 1px 1fr 1px 1fr',
        lg: '1fr',
        xl: '1fr'
      }}
      style={{ position: 'relative' }}
      columnGap={{ xs: 'space040', xl: 'space060' }}
      rowGap="space040"
      data-testid="article-container"
    >
      {articles.map((article: ArticleProps, articleIndex, articleArr) => {
        const articleBorder = breakpoint !== 'lg' &&
          breakpoint !== 'xl' &&
          articleIndex < articleArr.length - 1 && (
            <Divider overrides={{ stylePreset: 'lightDivider' }} vertical />
          );
        const topArticle = articleIndex === 0;
        const articleTopBorder =
          (breakpoint === 'xl' && articleIndex > 0) ||
          (breakpoint === 'lg' && articleIndex > 0);

        return (
          <React.Fragment key={article.title}>
            <Article
              {...article}
              hasTopBorder={articleTopBorder}
              hideImage={breakpoint === 'lg' && !topArticle}
            />
            {articleBorder}
          </React.Fragment>
        );
      })}
    </GridLayout>
  );

  const isMob = breakpoint === 'xs' || breakpoint === 'sm';

  return isMob ? (
    <Scroll
      overrides={{ overlays: { stylePreset: 'menuScrollOverlay' } }}
      tabIndex={undefined}
    >
      {articleGrid}
    </Scroll>
  ) : (
    articleGrid
  );
};

export const ArticleStackSmall = ({
  articles,
  isFullWidth,
  hideImage,
  hasTopBorder,
  breakpoint
}: {
  articles: ArticleProps[];
  isFullWidth: boolean;
  hideImage: boolean;
  hasTopBorder: boolean;
  breakpoint: BreakpointKeys;
}) => {
  const articleGrid = (
    <GridLayout columns={{ md: '1fr 1px 1fr' }} columnGap={{ md: 'space030' }}>
      {articles.map((article: ArticleProps, articleIndex, articleArr) => {
        const articleBorder = breakpoint !== 'xs' &&
          breakpoint !== 'sm' &&
          articleIndex < articleArr.length - 1 && (
            <Block
              marginBlockStart={{
                md: !hideImage ? 'space000' : 'space040'
              }}
            >
              <Divider
                overrides={{
                  stylePreset: 'lightDivider'
                }}
                vertical
              />
            </Block>
          );
        return (
          <React.Fragment key={article.title}>
            <Block marginBlockEnd={{ xs: 'space040', md: 'space000' }}>
              <Article
                {...article}
                hasTopBorder={hasTopBorder}
                hideImage={hideImage}
                isFullWidth={isFullWidth}
              />
            </Block>
            {articleBorder}
          </React.Fragment>
        );
      })}
    </GridLayout>
  );

  return <>{articleGrid}</>;
};
