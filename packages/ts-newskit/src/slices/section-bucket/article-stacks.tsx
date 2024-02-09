// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import React from 'react';
import { Block } from 'newskit';
import { Article, ArticleProps } from '../../components/slices/article';
import { clearCreditsAndCaption } from '../../utils/clear-credits-and-caption';
import { ClickHandlerType } from '../types';

interface ArticleStackProps {
  articles: ArticleProps[];
  clickHandler: ClickHandlerType;
}

export const ArticleStack: React.FC<ArticleStackProps> = ({
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
