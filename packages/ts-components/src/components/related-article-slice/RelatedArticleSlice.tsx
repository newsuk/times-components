import React from 'react';
import {
  Slice,
  SliceArticle,
  ClickHandlerType,
  MouseEventType
} from '@times-components/ts-slices';

import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import { RelatedArticles } from './types';
import formatSlice from './formatters';
import { Container } from './styles';

type RelatedArticleSliceProps = {
  slice: RelatedArticles;
  heading: string;
  clickHandler?: ClickHandlerType;
  analyticsStream?: (evt: any) => void;
};

export const RelatedArticleSlice = ({
  slice,
  heading,
  clickHandler,
  analyticsStream
}: RelatedArticleSliceProps) => {
  return (
    <TrackingContextProvider analyticsStream={analyticsStream}>
      {({ fireAnalyticsEvent }) => {
        const handleClick = (
          event: MouseEventType,
          article: SliceArticle,
          position?: string
        ) => {
          clickHandler && clickHandler(event, article, position);
          fireAnalyticsEvent({
            action: 'Pressed',
            component: 'RelatedArticles',
            object: 'RelatedArticles',
            attrs: {
              targetArticleHeadline: article.headline,
              targetArticleId: article.id!,
              targetArticleUrl: article.url
            }
          });
        };
        return (
          <Container>
            {heading && <div className="heading">{heading}</div>}
            <Slice slice={formatSlice(slice)} clickHandler={handleClick} />;
          </Container>
        );
      }}
    </TrackingContextProvider>
  );
};
