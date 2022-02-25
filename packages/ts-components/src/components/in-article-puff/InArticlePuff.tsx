import React from 'react';
import { Placeholder } from '@times-components/image';

import { DeckData } from '../../helpers/fetch/types';
import { AspectRatios } from '../../types/aspectRatio';
import { useFetch } from '../../helpers/fetch/FetchProvider';
import { sanitiseCopy } from '../../helpers/text-formatting/SanitiseCopy';

import { AspectRatio } from '../aspect-ratio/AspectRatio';
import { InArticleLink } from '../in-article-link/InArticleLink';
import {
  TrackingContext,
  TrackingContextProvider
} from '../../helpers/tracking/TrackingContextProvider';

import { PlaceholderContainer } from '../common-styles';
import {
  Container,
  ImageContainer,
  ContentContainer,
  Label,
  Headline,
  Copy
} from './styles';

type InArticlePuffData = {
  data: {
    image: string;
    label: string;
    headline: string;
    copy: string;
    link: string;
    linkText: string;
  };
};

type InArticlePuffDeckData = DeckData<never, InArticlePuffData>;

const scrollEvent = {
  attrs: {
    event_navigation_name: 'in-article component displayed : puff',
    event_navigation_browsing_method: 'scroll'
  }
};

const clickEvent = (buttonLabel: string, isLiveOrBreakingFlag?: string) => ({
  action: 'Clicked',
  attrs: {
    event_navigation_name: `button : ${buttonLabel}`,
    event_navigation_browsing_method: 'click',
    other_details: isLiveOrBreakingFlag
  }
});

export const InArticlePuff: React.FC<{
  sectionColour: string;
  forceImageAspectRatio?: AspectRatios;
  isLiveOrBreakingFlag?: string;
}> = ({ sectionColour, forceImageAspectRatio, isLiveOrBreakingFlag }) => {
  const handleClick = (
    fireAnalyticsEvent: (evt: TrackingContext) => void,
    buttonLabel: string
  ) => {
    fireAnalyticsEvent &&
      fireAnalyticsEvent(clickEvent(buttonLabel, isLiveOrBreakingFlag));
  };

  const { loading, error, data } = useFetch<InArticlePuffDeckData>();

  if (loading) {
    return (
      <PlaceholderContainer>
        <Placeholder />
      </PlaceholderContainer>
    );
  }

  if (error || data === undefined || data.body.data.length === 0) {
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
          component_name: `${headline}`,
          other_details: isLiveOrBreakingFlag
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
                <Copy
                  dangerouslySetInnerHTML={{
                    __html: sanitiseCopy(copy, { b: {}, i: {} })
                  }}
                />
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
