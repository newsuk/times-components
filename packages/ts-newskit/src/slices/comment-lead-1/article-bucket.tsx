import React from 'react';
import { Block } from 'newskit';
import { Article, ArticleProps } from '../../components/slices/article';
import { clearCreditsAndCaption } from '../../utils/clear-credits-and-caption';
import { ClickHandlerType } from '../types';

interface ArticleBucketProps {
  articles: ArticleProps[];
  clickHandler: ClickHandlerType;
}

export const ArticleBucket: React.FC<ArticleBucketProps> = ({
  articles,
  clickHandler
}) => {
  return (
    <>
      {articles.map((article: ArticleProps, articleIndex: number) => {
        const topArticle = articleIndex === 0;
        const articleTopBorder = articleIndex > 0;

        return (
          <React.Fragment key={article.headline}>
            <Article
              article={{
                ...clearCreditsAndCaption(article),
                hasTopBorder: articleTopBorder,
                hideImage: !topArticle
              }}
              clickHandler={clickHandler}
            />
            <Block marginBlockStart="space040" />
          </React.Fragment>
        );
      })}
    </>
  );
};
