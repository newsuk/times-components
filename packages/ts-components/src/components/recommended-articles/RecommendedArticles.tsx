import React from 'react';

import { Placeholder } from '@times-components/image';
import RelatedArticles from '@times-components/related-articles';

import { useFetch } from '../../helpers/fetch/FetchProvider';
import { RelatedArticleSliceType } from '../../types/related-article-slice';

export const RecommendedArticles: React.FC<{
  section: string;
  analyticsStream?: (evt: any) => void;
}> = ({ section, analyticsStream }) => {
  const { loading, error, data } = useFetch<any>();

  if (loading) {
    return (
      <>
        <Placeholder />
      </>
    );
  }

  if (error || data === undefined) {
    return null;
  }

  const slice: RelatedArticleSliceType = {
    sliceName: 'StandardSlice',
    items: data.recommendations
      ? data.recommendations.articles
          .slice(0, 3)
          .map((article: any) => ({ article }))
      : []
  };

  return (
    <RelatedArticles
      heading={`Today's ${section}`}
      slice={slice}
      isVisible
      analyticsStream={analyticsStream}
    />
  );
};
