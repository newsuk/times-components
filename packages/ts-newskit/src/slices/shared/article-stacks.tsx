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
  articleOptions
}: {
  articles: ArticleProps[];
  clickHandler: ClickHandlerType;
  articleOptions?: StackArticleOptions;
}) => {
  const defaultArticleOptions = {
    xs: {},
    sm: {},
    md: {},
    lg: {},
    xl: {}
  };

  const modifiedArticleOptions = {
    ...defaultArticleOptions,
    ...articleOptions
  };

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
        const topArticle = articleIndex === 0;

        const lgOptions = {
          hasTopBorder: articleIndex > 0,
          hideImage: !topArticle || article.hideImage
        };

        const xlOptions = {
          hasTopBorder: articleIndex > 0,
          hideImage: article.hideImage
        };

        return (
          <React.Fragment key={article.headline}>
            {Object.entries(modifiedArticleOptions).map(
              ([breakpoint, opts]) => (
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
              )
            )}
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
  articleOptions
}: {
  articles: ArticleProps[];
  clickHandler: ClickHandlerType;
  articleOptions?: StackArticleOptions;
}) => {
  const defaultArticleOptions = {
    xs: {},
    sm: {},
    md: {},
    lg: {},
    xl: {}
  };

  const modifiedArticleOptions = {
    ...defaultArticleOptions,
    ...articleOptions
  };

  return (
    <GridLayout columns={{ md: '1fr 1px 1fr' }} columnGap={{ md: 'space040' }}>
      {articles.map((article: ArticleProps, articleIndex, articleArr) => {
        return (
          <React.Fragment key={article.headline}>
            <Block marginBlockEnd={{ xs: 'space040', md: 'space000' }}>
              {Object.entries(modifiedArticleOptions).map(
                ([breakpoint, opts]) => (
                  <Visible {...{ [breakpoint]: true }}>
                    <Article
                      article={{
                        ...clearCreditsAndCaption(article),
                        ...opts
                      }}
                      clickHandler={clickHandler}
                    />
                  </Visible>
                )
              )}
            </Block>
            {articleIndex < articleArr.length - 1 && (
              <Visible md lg xl>
                <Divider
                  overrides={{
                    stylePreset: 'lightDivider'
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
  articleOptions
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
        xl: '402px'
      }}
      marginBlockStart={{
        xs: 'space040',
        lg: 'space000'
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
