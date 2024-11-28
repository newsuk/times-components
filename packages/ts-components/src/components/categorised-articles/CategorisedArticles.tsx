import React from 'react';
import {
  Slice,
  SliceArticle,
  MouseEventType
} from '@times-components/ts-slices';

import { useTrackingContext } from '../../helpers/tracking/TrackingContextProvider';
import {
  Article,
  getRecommendedArticlesSlice
} from '../../utils/linkedArticles/formatters';

import { Header } from '../../utils/linkedArticles/styles';

interface CategorisedArticles {
  heading: string;
  articles: Article[];
}
export const CategorisedArticles: React.FC<{
  heading: string;
  articles: any;
}> = ({ heading, articles }) => {
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
    <div id="categorised-articles">
      <Header>{`More from ${heading}`}</Header>
      <Slice
        slice={getRecommendedArticlesSlice(articles)}
        clickHandler={onClickHandler}
      />
    </div>
  );
};
