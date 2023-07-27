import React from 'react';
import { BreakpointKeys, Divider, GridLayout } from 'newskit';
import { Article, ArticleProps } from '../../components/slices/article';
import { ArticleDividerXL } from './styles';
import { ScrollContainer } from '../shared-styles';
import { clearCreditsAndCaption } from '../../utils/clear-credits-and-caption';

export const ArticleStack = ({
  articles,
  breakpoint
}: {
  articles: ArticleProps[];
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
      {articles.map((article: ArticleProps, articleIndex, articleArr) => {
        const articleBorder = breakpoint !== 'lg' &&
          breakpoint !== 'xl' &&
          articleIndex < articleArr.length - 1 && (
            <Divider overrides={{ stylePreset: 'lightDivider' }} vertical />
          );

        const articleTopBorder =
          (breakpoint === 'xl' && articleIndex > 1) ||
          (breakpoint === 'lg' && articleIndex > 0);

        return (
          <React.Fragment key={article.headline}>
            <Article
              {...clearCreditsAndCaption(article)}
              hasTopBorder={articleTopBorder}
              hideImage={breakpoint === 'lg'}
            />
            {articleBorder}
          </React.Fragment>
        );
      })}

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
    <ScrollContainer
      overrides={{ overlays: { stylePreset: 'menuScrollOverlay' } }}
      tabIndex={undefined}
    >
      {articleGrid}
    </ScrollContainer>
  ) : (
    articleGrid
  );
};
