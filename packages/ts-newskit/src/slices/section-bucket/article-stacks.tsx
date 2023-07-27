import React from 'react';
import { Block } from 'newskit';
import { Article, ArticleProps } from '../../components/slices/article';
import { clearCreditsAndCaption } from '../../utils/clear-credits-and-caption';

interface ArticleStackProps {
  articles: ArticleProps[];
}

export const ArticleStack: React.FC<ArticleStackProps> = ({ articles }) => {
  return (
    <>
      {articles.map((article: ArticleProps, articleIndex: number) => {
        const topArticle = articleIndex === 0;
        const articleTopBorder = articleIndex > 0;

        return (
          <React.Fragment key={article.headline}>
            <Article
              {...clearCreditsAndCaption(article)}
              hasTopBorder={articleTopBorder}
              hideImage={!topArticle}
            />
            <Block marginBlockStart="space040" />
          </React.Fragment>
        );
      })}
    </>
  );
};
