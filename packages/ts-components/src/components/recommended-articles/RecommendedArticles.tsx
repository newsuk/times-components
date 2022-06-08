import React from 'react';

import RelatedArticles from '@times-components/related-articles';

import { useFetch } from '../../helpers/fetch/FetchProvider';
import { getRelatedArticlesSlice } from './formatters';

export const RecommendedArticles: React.FC<{
  section: string;
  isVisible?: boolean;
  analyticsStream?: (evt: any) => void;
}> = ({ section, isVisible, analyticsStream }) => {
  const { loading, error, data } = useFetch<any>();

  if (loading || error || data === undefined) {
    return null;
  }

  return (
    <div
      id="recommended-articles"
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <RelatedArticles
        heading={`Today's ${section}`}
        slice={getRelatedArticlesSlice(data.recommendations)}
        isVisible
        analyticsStream={analyticsStream}
      />
    </div>
  );
};
