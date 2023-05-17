import React from 'react';
import { BreakpointKeys, Divider, GridLayout, Scroll } from 'newskit';
import {
  ArticleListItem,
  ArticleListItemProps
} from '../../components/slices/articleList';
import { ArticleDividerXL } from './styles';

export const ArticleStack = ({
  articles,
  breakpoint
}: {
  articles: ArticleListItemProps[];
  breakpoint: BreakpointKeys;
}) => {
  const articleGrid = (
    <GridLayout
      columns={{
        xs: '170px 1px 170px 1px 170px 1px 170px',
        md: '1fr 1px 1fr 1px 1fr 1px 1fr',
        lg: '1fr',
        xl: '1fr 1fr'
      }}
      style={{ position: 'relative' }}
      columnGap={{ xs: 'space040', xl: 'space060' }}
      rowGap="space040"
      data-testid="article-container"
    >
      {articles.map(
        (article: ArticleListItemProps, articleIndex, articleArr) => {
          const articleBorder = breakpoint !== 'lg' &&
            breakpoint !== 'xl' &&
            articleIndex < articleArr.length - 1 && (
              <Divider overrides={{ stylePreset: 'lightDivider' }} vertical />
            );

          const articleTopBorder =
            (breakpoint === 'xl' && articleIndex > 1) ||
            (breakpoint === 'lg' && articleIndex > 0);

          return (
            <React.Fragment key={article.title}>
              <ArticleListItem
                {...article}
                hasTopBorder={articleTopBorder}
                hideImage={breakpoint === 'lg'}
              />
              {articleBorder}
            </React.Fragment>
          );
        }
      )}

      {breakpoint === 'xl' && (
        <ArticleDividerXL
          overrides={{ stylePreset: 'lightDivider' }}
          vertical
        />
      )}
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
