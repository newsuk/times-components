import React from 'react';

import { RecommendedArticles as GetRecommendedArticles } from '@times-components/provider';

export type recommendationsProps = {
  userId: string;
  articleId: string;
};

export const RecommendedArticles = ({
  recomArgs
}: {
  recomArgs: recommendationsProps;
}) => {
  return (
    <GetRecommendedArticles
      publisher={'TIMES'}
      recomArgs={recomArgs}
      ssr={false}
      debounceTimeMs={0}
    >
      {({ isLoading, error, recommendations }: any) => {
        if (error) {
          return null;
        }

        if (isLoading) {
          return (
            // This is temporary...
            <div>
              <p>Loading...</p>
            </div>
          );
        }

        return (
          <div className='containers'>
            {recommendations.articles.map((recArticle: any) => {
              return (
                <a href={recArticle.url}>
                  <div id={recArticle.id}>
                    <img src={recArticle.media.Image} />
                    <p className="headline">
                      {recArticle.headline}
                    </p>
                    <p className="summary">
                      {recArticle.summary.ArticleParagraph}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        );
      }}
    </GetRecommendedArticles>
  );
};
