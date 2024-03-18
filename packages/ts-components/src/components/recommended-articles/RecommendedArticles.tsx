import React from 'react';
import get from 'lodash.get';
import {
  Slice,
  SliceArticle,
  MouseEventType
} from '@times-components/ts-slices';
import { transformDomainCom } from '@times-components/utils';

import { useFetch } from '../../helpers/fetch/FetchProvider';
import { useTrackingContext } from '../../helpers/tracking/TrackingContextProvider';
import { getRecommendedArticlesSlice } from './formatters';

import { Header } from './styles';

export const RecommendedArticles: React.FC<{
  heading: string;
  domainSpecificUrl: string;
}> = ({ heading }) => {
  const { loading, error, data } = useFetch<any>();

  if (loading || error) {
    return null;
  }

  const articles = get(data, 'recommendations.articles');

  if (!articles || !articles.length) {
    return null;
  }
  const transformedArticles = transformDomainCom(
    articles,
    'https://www.thetimes.com'
  );

  const { fireAnalyticsEvent } = useTrackingContext();

  const onClickHandler = (__: MouseEventType, article: SliceArticle) => {
    if (fireAnalyticsEvent) {
      fireAnalyticsEvent({
        action: 'Clicked',
        attrs: { article_parent_name: article.headline }
      });
    }
  };

  return (
    <div id="recommended-articles">
      <Header>{heading}</Header>
      <Slice
        slice={getRecommendedArticlesSlice(transformedArticles)}
        clickHandler={onClickHandler}
      />
    </div>
  );
};
