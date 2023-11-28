import React from 'react';
import { Block, Divider, GridLayout, Hidden, Visible } from 'newskit';
import { Article, ArticleProps } from '../../components/slices/article';
import { StackItem, ScrollContainer } from '../shared-styles';
import { ComposedArticleStack } from './composed-article-stack';
import { clearCreditsAndCaption } from '../../utils/clear-credits-and-caption';
import { ClickHandlerType, StackArticleOptions } from '../types';

export const ArticleStackLarge = ({
  articles,
  clickHandler,
}: {
  articles: ArticleProps[];
  clickHandler: ClickHandlerType;
  articleOptions?: StackArticleOptions;
}) => {
  const articleGrid = (
    <GridLayout
      columns={{
        xs: '170px 1px 170px 1px 170px 1px 170px 1px 170px',
        md: '1fr 1px 1fr 1px 1fr',
        lg: '1fr',
        xl: '1fr',
      }}
      style={{ position: 'relative' }}
      columnGap={{ xs: 'space040', xl: 'space060' }}
      rowGap="space040"
      data-testid="article-container"
      className="article-container"
    >
      {articles.map((article: ArticleProps, articleIndex, articleArr) => {
        return (
          <React.Fragment key={article.headline}>
            <Visible xl>
              <Article
                article={{
                  ...clearCreditsAndCaption(article),
                  imageRight: true,
                  hasTopBorder: articleIndex > 0,
                }}
                clickHandler={clickHandler}
              />
            </Visible>
            <Hidden xl>
              <Article
                article={{
                  ...clearCreditsAndCaption(article),
                  hasTopBorder: articleIndex > 0,
                }}
                clickHandler={clickHandler}
                className={`composed-article-card-${articleIndex}`}
              />
            </Hidden>
            {articleIndex < articleArr.length - 1 && (
              <Hidden lg xl>
                <Divider overrides={{ stylePreset: 'lightDivider' }} vertical />
              </Hidden>
            )}
          </React.Fragment>
        );
      })}
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
      <Visible md lg xl>
        {articleGrid}
      </Visible>
    </>
  );
};

export const ArticleStackSmall = ({
  articles,
  clickHandler,
  articleOptions,
}: {
  articles: ArticleProps[];
  clickHandler: ClickHandlerType;
  articleOptions?: {
    isFullWidth?: boolean;
    hasTopBorder?: boolean;
    hideImage?: boolean;
  };
}) => {
  return (
    <GridLayout columns={{ md: '1fr 1px 1fr' }} columnGap={{ md: 'space040' }}>
      {articles.map((article: ArticleProps, articleIndex, articleArr) => {
        return (
          <React.Fragment key={article.headline}>
            <Block
              marginBlockEnd={{ xs: 'space040', md: 'space000' }}
              className="article-stack-small"
            >
              <Article
                article={{
                  ...clearCreditsAndCaption(article),
                  ...articleOptions,
                }}
                clickHandler={clickHandler}
              />
            </Block>
            {articleIndex < articleArr.length - 1 && (
              <Visible md lg xl>
                <Divider
                  overrides={{
                    stylePreset: 'lightDivider',
                  }}
                  vertical
                />
              </Visible>
            )}
          </React.Fragment>
        );
      })}
    </GridLayout>
  );
};
export const ArticleStackLeadStory = ({
  modifiedArticles,
  clickHandler,
  articleOptions,
}: {
  modifiedArticles: ArticleProps[];
  clickHandler: ClickHandlerType;
  articleOptions?: StackArticleOptions;
}) => {
  return (
    <StackItem
      $width={{
        md: '720px',
        lg: '185px',
        xl: '402px',
      }}
      marginBlockStart={{
        xs: 'space040',
        lg: 'space000',
      }}
    >
      <ComposedArticleStack
        articleOptions={articleOptions}
        articles={modifiedArticles}
        clickHandler={clickHandler}
      />
    </StackItem>
  );
};
