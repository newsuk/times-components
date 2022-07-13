import React from 'react';
import get from 'lodash.get';

import RelatedArticles from '@times-components/related-articles';

import { useFetch } from '../../helpers/fetch/FetchProvider';
import { useTrackingContext } from '../../helpers/tracking/TrackingContextProvider';
import { getRelatedArticlesSlice } from './formatters';

export const RecommendedArticles: React.FC<{
  heading: string;
}> = ({ heading }) => {
  const { loading, error, data } = useFetch<any>();

  if (loading || error) {
    return null;
  }

  const articles = get(data, 'recommendations.articles');

  if (!articles || !articles.length) {
    return null;
  }

  const { fireAnalyticsEvent } = useTrackingContext();

  const slice = getRelatedArticlesSlice(articles);

  const onClickHandler = (__: MouseEvent, article: { url: string }) => {
    const found = slice.items.find(
      item => item.article.shortIdentifier === article.url.slice(-9)
    );

    if (fireAnalyticsEvent) {
      fireAnalyticsEvent({
        action: 'Clicked',
        attrs: { article_parent_name: found ? found.article.headline : '' }
      });
    }
  };

  return (
    <div id="recommended-articles">
      <RelatedArticles
        heading={heading}
        slice={slice}
        isVisible
        onPress={onClickHandler}
        // tslint:disable-next-line: no-empty
        analyticsStream={() => {}}
      />
    </div>
  );
};
