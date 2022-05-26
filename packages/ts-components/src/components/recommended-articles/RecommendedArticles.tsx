import React from 'react';

import RelatedArticles from '@times-components/related-articles';
import { GetRecommendedArticles } from '@times-components/provider';

import { getRelatedArticlesSlice } from './formatters';

import { Placeholder } from '@times-components/image';

type RecommendedArticlesProps = {
  articleId: string;
  section: string;
  analyticsStream?: (evt: any) => void;
};

export const RecommendedArticles = ({
  articleId,
  section,
  analyticsStream
}: RecommendedArticlesProps) => (
  <GetRecommendedArticles
    publisher={'TIMES'}
    recomArgs={{ userId: '', articleId }}
    ssr={false}
    debounceTimeMs={0}
  >
    {({ isLoading, error, recommendations }: any) => {
      if (error) {
        return null;
      }

      if (isLoading) {
        return (
          <div className="placeholder">
            <Placeholder />
          </div>
        );
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
