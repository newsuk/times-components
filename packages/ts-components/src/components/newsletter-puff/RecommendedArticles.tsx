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
      {({ isLoading, error, data }: any) => {
        // tslint:disable-next-line:no-console
        console.log(isLoading, error, data);

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

        return (
          <div>{data}</div>
        );
      }}
    </GetRecommendedArticles>
  );
};
