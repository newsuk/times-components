import React, { useState, useEffect } from 'react';

import RelatedArticles from '@times-components/related-articles';
import { GetRecommendedArticles } from '@times-components/provider';

import { getRelatedArticlesSlice } from './formatters';

import { RecommendedArticlesContainer } from './styles';

type RecommendedArticlesProps = {
  articleId: string;
  section: string;
  isVisible?: boolean;
  analyticsStream?: (evt: any) => void;
};

export const RecommendedArticles = ({
  articleId,
  section,
  isVisible,
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
    <RecommendedArticlesContainer isVisible={isVisible}>
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
    </RecommendedArticlesContainer>
  );
};
