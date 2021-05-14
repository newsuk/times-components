import React, { MouseEvent, useState } from 'react';

import { Placeholder } from '@times-components/image';
import { IconForwardChevron } from '@times-components/icons';

import { useFetch } from '../../helpers/fetch/FetchProvider';

import { TrackScrolledIntoView } from '../../helpers/tracking/TrackScrolledIntoView';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

import {
  PlaceholderContainer,
  Container,
  ImageContainer,
  ContentContainer,
  Label,
  Headline,
  Copy,
  Link,
  LinkText
} from './styles';

const scrollEvent = {
  event_navigation_name: 'in-article-component displayed : puff',
  event_navigation_browsing_method: 'scroll'
};

const clickEvent = (buttonType: string) => ({
  event_navigation_name: `button : ${buttonType}`,
  event_navigation_browsing_method: 'click'
});

export const InArticlePuff: React.FC<{
  sectionColour: string;
}> = ({ sectionColour }) => {
  const [colour, setColour] = useState('#bf0000');

  const handleClick = (
    event: MouseEvent<HTMLAnchorElement>,
    fireAnalyticsEvent: (evt: any) => void
  ) => {
    // tslint:disable-next-line:no-console
    console.log('xxx', event);
    const clickTarget = event.currentTarget.textContent;
    const buttonType =
      clickTarget !== '' && clickTarget !== null ? clickTarget : 'image';
    fireAnalyticsEvent && fireAnalyticsEvent(clickEvent(buttonType));
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
        component_type: 'in-article-component : puff : interactive',
        event_navigation_action: 'navigation',
        component_name: `${headline}`
      }}
    >
      {({ fireAnalyticsEvent }) => (
        <TrackScrolledIntoView analyticsEvent={scrollEvent}>
          {({ intersectObserverRef }) => (
            <Container
              ref={intersectObserverRef}
              style={{ borderTop: `2px ${sectionColour} solid` }}
              data-testid="InArticlePuff - Container"
            >
              {image ? (
                <ImageContainer>
                  <a
                    href={link}
                    onClick={evt => handleClick(evt, fireAnalyticsEvent)}
                  >
                    <img src={image} />
                  </a>
                </ImageContainer>
              ) : null}

              <ContentContainer hasImage={hasImage}>
                <div>
                  <Label hasImage={hasImage} style={{ color: sectionColour }}>
                    {label}
                  </Label>
                  <a
                    href={link}
                    onClick={evt => handleClick(evt, fireAnalyticsEvent)}
                  >
                    <Headline hasImage={hasImage}>{headline}</Headline>
                  </a>
                  {copy && <Copy>{copy}</Copy>}
                </div>

                <Link
                  href={link}
                  onClick={evt => handleClick(evt, fireAnalyticsEvent)}
                  onMouseOver={() => setColour('#696969')}
                  onMouseLeave={() => setColour('#BF0000')}
                >
                  <LinkText>{linkText ? linkText : 'Read more'}</LinkText>
                  <IconForwardChevron
                    fillColour={colour}
                    height={18}
                    width={8}
                  />
                </Link>
              </ContentContainer>
            </Container>
          )}
        </TrackScrolledIntoView>
      )}
    </TrackingContextProvider>
  );
};
