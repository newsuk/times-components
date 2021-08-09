import React from 'react';
import { Container } from './styles';
import { RelatedArticle, RelatedArticleType } from './RelatedArticle';
import { SingleRelatedArticle } from './SingleRelatedArticle';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

type RelatedArticlesProps = {
  sectionColour: string;
  heading: string;
  relatedArticles: RelatedArticleType[];
  showImages?: boolean;
};

export const InArticleRelatedArticles = ({
  heading,
  relatedArticles,
  sectionColour,
  showImages = true
}: RelatedArticlesProps) => (
  <TrackingContextProvider
    context={{
      object: 'InArticleRelatedArticles',
      attrs: {
        component_type: 'in-article component : related articles : interactive',
        event_navigation_action: 'navigation',
        component_name: `in-article component : related article : in view`
      }
    }}
    scrolledEvent={{
      attrs: {
        event_navigation_name:
          'in-article component displayed : related article',
        event_navigation_browsing_method: 'scroll'
      }
    }}
  >
    {({ intersectObserverRef }) => (
      <Container sectionColour={sectionColour} ref={intersectObserverRef}>
        {heading && <div className="heading">{heading}</div>}
        <nav>
          {relatedArticles &&
            relatedArticles.map(
              ({
                label,
                headline,
                link,
                image,
                summary,
                byline,
                publishedTime
              }) =>
                relatedArticles.length > 1 ? (
                  <RelatedArticle
                    key={headline + ' ' + link}
                    sectionColour={sectionColour}
                    label={label}
                    headline={headline}
                    link={link}
                    image={showImages ? image : undefined}
                  />
                ) : (
                  <SingleRelatedArticle
                    key={headline + ' ' + link}
                    sectionColour={sectionColour}
                    label={label}
                    headline={headline}
                    summary={summary}
                    byline={byline}
                    publishedTime={publishedTime}
                    link={link}
                    image={showImages ? image : undefined}
                  />
                )
            )}
        </nav>
      </Container>
    )}
  </TrackingContextProvider>
);
