import React from 'react';

import { RecommendedArticles as GetRecommendedArticles } from '@times-components/provider';

export type recommendationsProps = {
  userId: "1234";
  articleId: "94a01926-719a-11ec-aacf-0736e08b15cd";
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
        // tslint:disable-next-line:no-console
        console.log(isLoading, error, recommendations);

        if (error) {
          return null;
        }

        if (isLoading) {
          return (
            <div>
              <p>Loading...</p>
            </div>
          );
        }

        // return <div>{JSON.stringify(recommendations)}</div>;

        return (
          <div className='containers'>
            {recommendations.articles.map(postData => {
              console.log('PostData: ',postData);
              return (
                <div id={postData.id}>
                  <img src={postData.media.Image} />
                  <p className="headline">
                    {postData.headline}
                  </p>
                  <p className="summary">
                    {postData.summary.ArticleParagraph}
                  </p>
                </div>
              );
            })}
          </div>
        );

        // return (
        //   <div className="recArticle">
        //     {recommendations.articles.map(recs => <div>{recs.headline}</div>)}
        //   </div>
        // );

        // Object.entries(recommendations).map(([key, value]) => {
        //   return (
        //     <div key={key}>
        //       <div>Key: {key}</div>
        //       <div>Value: {value}</div>
        //     </div>
        //   );
        // });
      }}
    </GetRecommendedArticles>
  );
};
