import React from 'react';
import { Divider, GridLayout, Hidden, Visible } from 'newskit';
import { Article, ArticleProps } from '../../components/slices/article';
import { ScrollContainer, ArticleDividerXL } from '../shared-styles';
import { clearCreditsAndCaption } from '../../utils/clear-credits-and-caption';
import { ClickHandlerType } from '../types';
import { defaultArticleOptions } from '../../utils/default-article-options';

export const ArticleStack = ({
  articles,
  clickHandler
}: {
  articles: ArticleProps[];
  clickHandler: ClickHandlerType;
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
        const articleBorder = articleIndex < articleArr.length - 1 && (
          <Hidden lg xl>
            <Divider overrides={{ stylePreset: 'lightDivider' }} vertical />
          </Hidden>
        );

        const lgOptions = {
          hasTopBorder: articleIndex > 0,
          hideImage: true
        };
        const xlOptions = {
          hasTopBorder: articleIndex > 1
        };

        return (
          <React.Fragment key={article.headline}>
            {Object.entries(defaultArticleOptions).map(([breakpoint, opts]) => (
              <Visible {...{ [breakpoint]: true }}>
                <Article
                  article={{
                    ...clearCreditsAndCaption(article),
                    ...(breakpoint === 'lg' && lgOptions),
                    ...(breakpoint === 'xl' && xlOptions),
                    ...opts
                  }}
                  clickHandler={clickHandler}
                />
              </Visible>
            ))}
            {articleBorder}
          </React.Fragment>
        );
      })}

      <Visible xl>
        <ArticleDividerXL
          overrides={{ stylePreset: 'lightDivider' }}
          vertical
        />
      </Visible>
    </GridLayout>
  );

  return (
    <>
      <Visible xs sm>
        <ScrollContainer
          overrides={{ overlays: { stylePreset: 'menuScrollOverlay' } }}
          tabIndex={undefined}
        >
          {articleGrid}
        </ScrollContainer>
      </Visible>
      <Hidden xs sm>
        {articleGrid}
      </Hidden>
    </>
  );
};
