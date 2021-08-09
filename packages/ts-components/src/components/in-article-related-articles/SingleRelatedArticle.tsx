import React from 'react';
import DatePublication from '@times-components/date-publication';

import {
  SingleRelatedArticleContainer,
  SingleRelatedArticlesImageContainer
} from './SingleRelatedArticle.styles';
import { AspectRatio } from '../aspect-ratio/AspectRatio';
import { RelatedArticleType } from './RelatedArticle';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import { handleClick } from './tracking-helpers';

type RelatedArticleProps = {
  sectionColour: string;
} & RelatedArticleType;

export const SingleRelatedArticle = ({
  headline,
  link,
  image,
  summary,
  publishedTime,
  byline
}: RelatedArticleProps) => {
  return (
    <TrackingContextProvider>
      {({ fireAnalyticsEvent, intersectObserverRef }) => (
        <SingleRelatedArticleContainer ref={intersectObserverRef}>
          {image && (
            <SingleRelatedArticlesImageContainer>
              <a
                href={link}
                onClick={() =>
                  handleClick(fireAnalyticsEvent, 'image', headline)
                }
              >
                <AspectRatio ratio="16:9">
                  <img src={image} />
                </AspectRatio>
              </a>
            </SingleRelatedArticlesImageContainer>
          )}
          <section>
            <a
              href={link}
              onClick={() =>
                handleClick(fireAnalyticsEvent, 'headline', headline)
              }
            >
              <h3>{headline}</h3>
            </a>
            <div className="summary">{summary}</div>
            <div className="publishedTime">
              <DatePublication date={publishedTime!} showDay={false} />
            </div>
            <div className="byline">{byline}</div>
          </section>
        </SingleRelatedArticleContainer>
      )}
    </TrackingContextProvider>
  );
};
