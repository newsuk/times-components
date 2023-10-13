import React from 'react';
import { Divider, GridLayout, Visible } from 'newskit';
import { Article, ArticleProps } from '../../components/slices/article';
import { ArticleDividerXL } from '../shared-styles';
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
        const articleBorder = articleIndex < articleArr.length - 1 && (
          <Visible md>
            <Divider overrides={{ stylePreset: 'lightDivider' }} vertical />
          </Visible>
        );

        const lgOptions = {
          hasTopBorder: articleIndex > 0,
          hideImage: true
        };
        const xlOptions = {
          hasTopBorder: articleIndex > 1
        };

        const mobileOptions = {
          hideImage: true,
          hasTopBorder: articleIndex > 0
        };

        return (
          <React.Fragment key={article.headline}>
            {Object.entries(defaultArticleOptions).map(([breakpoint, opts]) => (
              <Visible {...{ [breakpoint]: true }}>
                <Article
                  article={{
                    ...clearCreditsAndCaption(article),
                    ...(breakpoint === 'xs' && mobileOptions),
                    ...(breakpoint === 'sm' && mobileOptions),
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
};
