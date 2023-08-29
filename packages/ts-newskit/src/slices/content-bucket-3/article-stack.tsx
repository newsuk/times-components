import React from 'react';
import { BreakpointKeys, Divider, GridLayout } from 'newskit';
import { Article, ArticleProps } from '../../components/slices/article';
import { ArticleDividerXL } from '../shared-styles';
import { clearCreditsAndCaption } from '../../utils/clear-credits-and-caption';
import { ClickHandlerType } from '../types';

export const ArticleStack = ({
  articles,
  breakpoint,
  clickHandler
}: {
  articles: ArticleProps[];
  breakpoint: BreakpointKeys;
  clickHandler: ClickHandlerType;
}) => {
  return (
    <GridLayout
      columns={{
        xs: '1fr',
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
        const articleBorder = breakpoint === 'md' &&
          articleIndex < articleArr.length - 1 && (
            <Divider overrides={{ stylePreset: 'lightDivider' }} vertical />
          );

        const hasImage = ['xs', 'sm', 'lg'].includes(breakpoint);

        const articleTopBorder =
          (hasImage && articleIndex > 0) ||
          (breakpoint === 'xl' && articleIndex > 1);

        return (
          <React.Fragment key={article.headline}>
            <Article
              article={{
                ...clearCreditsAndCaption(article),
                hasTopBorder: articleTopBorder,
                hideImage: hasImage
              }}
              clickHandler={clickHandler}
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
};
