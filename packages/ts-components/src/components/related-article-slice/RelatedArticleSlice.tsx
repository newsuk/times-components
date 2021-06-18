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
  const standardRoles = ['standard-1', 'standard-2', 'standard-3'];
  const articles = slice.items.map(({ article }, index) => {
    const { headline, id, shortHeadline } = article;
    return {
      id,
      headline: headline || shortHeadline,
      role: standardRoles[index]
    };
  });

  return (
    <TrackingContextProvider
      analyticsStream={analyticsStream}
      scrolledEvent={{
        action: 'Scrolled',
        component: 'RelatedArticles',
        object: 'RelatedArticles',
        attrs: {
          articles,
          articleCount: `${slice.items.length}`
        }
      }}
    >
      {({ fireAnalyticsEvent, intersectObserverRef }) => {
        const handleClick = (
          event: MouseEventType,
          article: SliceArticle,
          position?: string
        ) => {
          clickHandler && clickHandler(event, article, position);
          fireAnalyticsEvent({
            action: 'Pressed',
            component: 'RelatedArticleItem',
            object: 'Article',
            attrs: {
              articles,
              targetArticleHeadline: article.headline,
              targetArticleId: article.id!,
              targetArticleUrl: article.url,
              articleCount: `${slice.items.length}`
            }
          });
        };
        return (
          <Container ref={intersectObserverRef} className="RelatedArticleSlice">
            {heading && <div className="heading">{heading}</div>}
            <Slice slice={formatSlice(slice)} clickHandler={handleClick} />
          </Container>
        );
      }}
    </TrackingContextProvider>
  );
};
