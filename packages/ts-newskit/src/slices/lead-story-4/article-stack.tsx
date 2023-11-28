import React from 'react';
import { Divider, Block, GridLayout } from 'newskit';
import { Article, ArticleProps } from '../../components/slices/article';
import { ArticleDividerXL } from '../shared-styles';
import { clearCreditsAndCaption } from '../../utils/clear-credits-and-caption';
import { ClickHandlerType } from '../types';

export const ArticleStacks = ({
  articles,
  clickHandler,
  isMediumBreakPoint,
  hasTopBorder,
}: {
  articles: ArticleProps[];
  clickHandler: ClickHandlerType;
  isMediumBreakPoint?: boolean;
  hasTopBorder?: boolean;
}) => {
  return (
    <GridLayout
      columns={{
        xs: '170px 1px 170px 1px 170px 1px 170px',
        md: isMediumBreakPoint ? '1fr 1px 1fr 1px 1fr' : '1fr',
        lg: '1fr 1fr',
        xl: '1fr 1fr',
      }}
      style={{ position: 'relative' }}
      columnGap={{
        xs: 'space040',
        md: isMediumBreakPoint ? 'space040' : 'space060',
      }}
      rowGap={isMediumBreakPoint ? 'space000' : 'space040'}
      data-testid={`article-container-desktop`}
    >
      {articles.map((article: ArticleProps, articleIndex, articleArr) => {
        const articleBorder = isMediumBreakPoint &&
          articleIndex < articleArr.length - 1 && (
            <Divider
              aria-label="stacked-article-divider-vertical"
              overrides={{ stylePreset: 'lightDivider' }}
              vertical
            />
          );
        return (
          <React.Fragment key={article.id}>
            {hasTopBorder ? (
              <Block marginBlockStart="space040">
                <Article
                  article={{
                    ...clearCreditsAndCaption(article),
                    hasTopBorder,
                  }}
                  clickHandler={clickHandler}
                />
              </Block>
            ) : (
              <Article
                article={{
                  ...clearCreditsAndCaption(article),
                  hasTopBorder: article.hasTopBorder,
                }}
                clickHandler={clickHandler}
              />
            )}
            {articleBorder}
          </React.Fragment>
        );
      })}
      <ArticleDividerXL
        overrides={{ stylePreset: 'lightDivider' }}
        vertical
        data-testid="article-stack-large-divider"
      />
    </GridLayout>
  );
};

export const ArticleStacksLgAndXl = ({
  articles,
  clickHandler,
}: {
  articles: ArticleProps[];
  clickHandler: ClickHandlerType;
}) => {
  return (
    <GridLayout columns="1fr 1px 1fr 1px 1fr 1px 1fr" columnGap="space040">
      {articles.map((article: ArticleProps, articleIndex, articleArr) => {
        const articleBorder = articleIndex < articleArr.length - 1 && (
          <Divider
            overrides={{
              stylePreset: 'lightDivider',
            }}
            vertical
          />
        );
        return (
          <React.Fragment key={article.headline}>
            <Article
              article={{
                ...clearCreditsAndCaption(article),
              }}
              clickHandler={clickHandler}
            />
            {articleBorder}
          </React.Fragment>
        );
      })}
    </GridLayout>
  );
};
