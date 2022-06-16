import React from 'react';

import RelatedArticles from '@times-components/related-articles';

import { useFetch } from '../../helpers/fetch/FetchProvider';
import { useTrackingContext } from '../../helpers/tracking/TrackingContextProvider';
import { getRelatedArticlesSlice } from './formatters';

export const RecommendedArticles: React.FC<{
  heading: string;
  isVisible?: boolean;
  analyticsStream?: (evt: any) => void;
}> = ({ heading, isVisible, analyticsStream }) => {
  const { loading, error, data } = useFetch<any>();

  if (loading || error || data === undefined) {
    return null;
  }

  const { fireAnalyticsEvent } = useTrackingContext();

  const slice = getRelatedArticlesSlice(data.recommendations);

  const onClickHandler = (__: MouseEvent, article: { url: string }) => {
    const found = slice.items.find(
      item => item.article.shortIdentifier === article.url.slice(-9)
    );

    if (fireAnalyticsEvent) {
      fireAnalyticsEvent({
        action: 'Clicked',
        object: 'RecommendedArticles',
        attrs: { article_parent_name: found ? found.article.headline : '' }
      });
    }
  };

  return (
    <div
      id="recommended-articles"
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <RelatedArticles
        heading={heading}
        slice={slice}
        isVisible
        onPress={onClickHandler}
        analyticsStream={analyticsStream}
      />
    </div>
  );
};
