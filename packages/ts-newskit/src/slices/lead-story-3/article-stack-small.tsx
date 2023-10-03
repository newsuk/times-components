import { GridLayout, Block, Visible, Hidden, Divider } from 'newskit';
import React from 'react';
import { Article } from '../../components/slices/article';
import {
  ArticleProps,
  clearCreditsAndCaption
} from '../../utils/clear-credits-and-caption';
import { ClickHandlerType } from '../types';

export const ArticleStackSmall = ({
  articles,
  clickHandler
}: {
  articles: ArticleProps[];
  clickHandler: ClickHandlerType;
}) => {
  const articleGrid = (
    <GridLayout columns={{ md: '1fr 1px 1fr' }} columnGap={{ md: 'space040' }}>
      {articles.map((article: ArticleProps, articleIndex, articleArr) => {
        return (
          <React.Fragment key={article.headline}>
            <Block marginBlockEnd={{ xs: 'space040', md: 'space000' }}>
              <Visible xs sm>
                <Article
                  article={{
                    ...clearCreditsAndCaption(article),
                    isFullWidth: true
                  }}
                  clickHandler={clickHandler}
                />
              </Visible>
              <Visible md>
                <Article
                  article={{
                    ...clearCreditsAndCaption(article),
                    hideImage: true
                  }}
                  clickHandler={clickHandler}
                />
              </Visible>
              <Visible lg xl>
                <Article
                  article={{
                    ...clearCreditsAndCaption(article)
                  }}
                  clickHandler={clickHandler}
                />
              </Visible>
            </Block>
            {articleIndex < articleArr.length - 1 && (
              <Hidden xs sm>
                <Divider
                  overrides={{
                    stylePreset: 'lightDivider'
                  }}
                  vertical
                />
              </Hidden>
            )}
          </React.Fragment>
        );
      })}
    </GridLayout>
  );

  return <>{articleGrid}</>;
};
