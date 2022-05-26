import React, { useState, useEffect } from 'react';

import RelatedArticles from '@times-components/related-articles';
import { GetRecommendedArticles } from '@times-components/provider';

import { getRelatedArticlesSlice } from './formatters';

type RecommendedArticlesProps = {
  articleId: string;
  section: string;
  analyticsStream?: (evt: any) => void;
};

export const RecommendedArticles = ({
  articleId,
  section,
  analyticsStream
}: RecommendedArticlesProps) => {
  const [userId, setUserId] = useState<string | undefined>();

  useEffect(() => {
    setUserId('1234');
  }, []);

  if (!userId) {
    return null;
  }

  return (
    <GetRecommendedArticles
      publisher={'TIMES'}
      recomArgs={{ userId, articleId }}
      ssr={false}
      debounceTimeMs={0}
    >
      {({ isLoading, error, recommendations }: any) => {
        if (isLoading || error) {
          return null;
        }

        return (
          <RelatedArticles
            heading={`Today's ${section}`}
            slice={getRelatedArticlesSlice(recommendations)}
            isVisible
            analyticsStream={analyticsStream}
          />
        );
      }}
    </GetRecommendedArticles>
  );
};
