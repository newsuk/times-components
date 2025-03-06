import React, { useRef, useState, useEffect } from 'react';
import { Placeholder } from '@times-components/image';
import { useFetch } from '../../helpers/fetch/FetchProvider';
import {
  TrackingContext,
  TrackingContextProvider
} from '../../helpers/tracking/TrackingContextProvider';
import { sanitiseCopy } from '../../helpers/text-formatting/SanitiseCopy';
import { breakpoints } from '@times-components/ts-styleguide';
import {
  Container,
  ContentContainer,
  Headline,
  ListContainer,
  List,
  ListItem,
  ReadMoreContainer,
  ReadMoreButton
} from './styles';
import { PlaceholderContainer, Label } from '../common-styles';

import { DeckData } from '../../helpers/fetch/types';

type InfoCardData = {
  type: string;
  data: {
    copy: string;
  };
};

type InfoCardDeckData = DeckData<never, InfoCardData>;

const scrollEvent = {
  attrs: {
    event_navigation_name:
      'in-article component displayed : bullet point component',
    event_navigation_browsing_method: 'automated'
  }
};

const clickEvent = (buttonLabel: string) => ({
  action: 'Clicked',
  attrs: {
    event_navigation_name: `button : ${buttonLabel}`,
    event_navigation_browsing_method: 'click'
  }
});

const { medium } = breakpoints;

export const InfoCardBulletPoints: React.FC<{
  sectionColour: string;
}> = ({ sectionColour }) => {
  const { loading, error, data } = useFetch<InfoCardDeckData>();

  if (loading) {
    return (
      <PlaceholderContainer>
        <Placeholder />
      </PlaceholderContainer>
    );
  }

  if (error || data === undefined) {
    return null;
  }

  const { headline, label } = data.fields;
  const infoCardData = data.body.data;
  const [readMore, setReadMore] = useState(false);

  const handleClick = (
    fireAnalyticsEvent: (evt: TrackingContext) => void,
    buttonLabel: string
  ) => {
    fireAnalyticsEvent && fireAnalyticsEvent(clickEvent(buttonLabel));
    setReadMore(!readMore);
  };

  const readMoreRef = useRef<HTMLDivElement>(null);
  const [showReadMore, setShowReadMore] = useState(false);
  const windowWidth = window.innerWidth.toString();
  const maxHeight = 350;
  useEffect(() => {
    const listContainer = readMoreRef.current;
    if (listContainer) {
      setShowReadMore(listContainer.clientHeight > maxHeight);
    }
  }, []);

  return (
    <TrackingContextProvider
      context={{
        object: 'InArticleBulletPoint',
        attrs: {
          component_type:
            'in-article component : bullet point component: ' +
            (showReadMore && windowWidth < medium ? 'interactive' : 'static'),
          event_navigation_action: 'navigation',
          component_name: `${headline}`
        }
      }}
      scrolledEvent={scrollEvent}
    >
      {({ fireAnalyticsEvent, intersectObserverRef }) => (
        <Container ref={intersectObserverRef} sectionColour={sectionColour}>
          <ContentContainer>
            <Label sectionColour={sectionColour}>{label}</Label>
            <Headline>{headline}</Headline>
            <ListContainer
              ref={readMoreRef}
              readMore={readMore}
              maxHeight={maxHeight}
              showReadMore={showReadMore}
            >
              <List>
                {infoCardData.map((row: InfoCardData, index: number) => (
                  <ListItem
                    key={index}
                    dangerouslySetInnerHTML={{
                      __html: sanitiseCopy(row.data.copy, { b: {}, i: {} })
                    }}
                  />
                ))}
              </List>
            </ListContainer>
          </ContentContainer>
          <ReadMoreContainer readMore={readMore} showReadMore={showReadMore}>
            <ReadMoreButton
              onClick={() =>
                handleClick(
                  fireAnalyticsEvent,
                  readMore ? 'Collapse' : 'Read more'
                )
              }
            >
              {readMore ? 'Collapse' : 'Read more'}
            </ReadMoreButton>
          </ReadMoreContainer>
        </Container>
      )}
    </TrackingContextProvider>
  );
};
