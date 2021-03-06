import React from 'react';
import sanitizeHtml from 'sanitize-html';

import { Placeholder } from '@times-components/image';

import { AspectRatios } from '../../types/aspectRatio';

import { useFetch } from '../../helpers/fetch/FetchProvider';
import {
  TrackingContext,
  TrackingContextProvider
} from '../../helpers/tracking/TrackingContextProvider';

import { AspectRatio } from '../aspect-ratio/AspectRatio';
import { InArticleLink } from '../in-article-link/InArticleLink';

import {
  PlaceholderContainer,
  Container,
  ImageContainer,
  ContentContainer,
  Label,
  Headline,
  Copy
} from './styles';

const scrollEvent = {
  attrs: {
    event_navigation_name: 'in-article component displayed : puff',
    event_navigation_browsing_method: 'scroll'
  }
};

const clickEvent = (buttonLabel: string) => ({
  action: 'Clicked',
  attrs: {
    event_navigation_name: `button : ${buttonLabel}`,
    event_navigation_browsing_method: 'click'
  }
});

const sanitiseCopy = (copy: string, allowedTags: string[] = []) =>
  sanitizeHtml(copy, { allowedTags, allowedAttributes: {} });

export const InArticlePuff: React.FC<{
  sectionColour: string;
  forceImageAspectRatio?: AspectRatios;
  sanitiseHtml?: boolean;
}> = ({ sectionColour, forceImageAspectRatio, sanitiseHtml }) => {
  const handleClick = (
    fireAnalyticsEvent: (evt: TrackingContext) => void,
    buttonLabel: string
  ) => {
    fireAnalyticsEvent && fireAnalyticsEvent(clickEvent(buttonLabel));
  };

  const { loading, error, data } = useFetch();

  if (loading) {
    return (
      <PlaceholderContainer>
        <Placeholder />
      </PlaceholderContainer>
    );
  }

  if (error) {
    return null;
  }

  const {
    image,
    label,
    headline,
    copy,
    link,
    linkText
  } = data.body.data[0].data;

  const hasImage = Boolean(image);

  return (
    <TrackingContextProvider
      context={{
        object: 'InArticlePuff',
        attrs: {
          component_type: 'in-article component : puff : interactive',
          event_navigation_action: 'navigation',
          component_name: `${headline}`
        }
      }}
      scrolledEvent={scrollEvent}
    >
      {({ fireAnalyticsEvent, intersectObserverRef }) => (
        <Container ref={intersectObserverRef} sectionColour={sectionColour}>
          {image ? (
            <ImageContainer>
              <a
                href={link}
                onClick={() => handleClick(fireAnalyticsEvent, 'image')}
              >
                <AspectRatio ratio={forceImageAspectRatio}>
                  <img src={image} />
                </AspectRatio>
              </a>
            </ImageContainer>
          ) : null}

          <ContentContainer hasImage={hasImage}>
            <div>
              <Label hasImage={hasImage} sectionColour={sectionColour}>
                {label}
              </Label>
              <a
                href={link}
                onClick={() => handleClick(fireAnalyticsEvent, 'headline')}
              >
                <Headline hasImage={hasImage}>{headline}</Headline>
              </a>
              {copy && (
                <>
                  {sanitiseHtml ? (
                    <Copy>{sanitiseCopy(copy)}</Copy>
                  ) : (
                    <Copy
                      dangerouslySetInnerHTML={{
                        __html: sanitiseCopy(copy, ['b', 'i'])
                      }}
                    />
                  )}
                </>
              )}
            </div>

            <InArticleLink
              link={link}
              linkText={linkText || 'Read more'}
              onClick={() =>
                handleClick(fireAnalyticsEvent, linkText || 'Read more')
              }
            />
          </ContentContainer>
        </Container>
      )}
    </TrackingContextProvider>
  );
};
