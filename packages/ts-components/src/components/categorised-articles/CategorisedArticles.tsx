import React from 'react';
import {
  Slice,
  SliceArticle,
  MouseEventType
} from '@times-components/ts-slices';

import { useTrackingContext } from '../../helpers/tracking/TrackingContextProvider';
import { getRecommendedArticlesSlice } from '../../utils/linkedArticles/formatters';

import { Header } from '../../utils/linkedArticles/styles';
import { Container } from './styles';

interface CategorisedArticlesProps {
  heading: string;
  articles: any;
}
export const CategorisedArticles: React.FC<CategorisedArticlesProps> = ({
  heading,
  articles
}) => {
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
    <Container id="categorised-articles">
      <Header>{`More from ${heading}`}</Header>
      <Slice
        slice={getRecommendedArticlesSlice(articles)}
        clickHandler={onClickHandler}
      />
    </Container>
  );
};
