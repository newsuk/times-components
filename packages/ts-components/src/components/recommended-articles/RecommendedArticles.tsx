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

  const slice = getRelatedArticlesSlice(data.recommendations);

  const onClickHandler = (__: MouseEvent, article: { url: string }) => {
    // tslint:disable-next-line:no-console
    console.log('RecommendedArticles', article.url);

    // tslint:disable-next-line:no-console
    console.log('RecommendedArticles', slice);
  };

  return (
    <div
      id="recommended-articles"
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <RelatedArticles
        heading={`Today's ${section}`}
        slice={slice}
        isVisible
        onPress={onClickHandler}
        analyticsStream={analyticsStream}
      />
    </div>
  );
};
