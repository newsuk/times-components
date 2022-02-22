import React from "react";
import { TrackingContextProvider } from  "@times-components/ts-components";
import KeyFactsText from "./key-facts-text";
import { withTrackingContext, withTrackScrollDepth  } from "@times-components/tracking";
import { defaultProps, propTypes } from "./key-facts-prop-types";
import {
  BulletContainer,
  Bullet,
  KeyFactsTitle,
  KeyFactsContainer
} from "./styles";

let a;

const analyticsData = {
  event: {        event_navigation_name: 'In-article component displayed: key moments',
  event_navigation_action: 'navigation',},
  other: {
    componentType: 'In-article component: key moments: static',
    articleName: '',
    componentName: 'title',
    sectionDetails: 'article section',
    articleParentName: 'article headline'
  }
}

const KeyFacts = ({ ast, analyticsStream}) => {
  const {
    children,
    attributes: { title }
  } = ast;
  const { children: keyFactsItems } = children[0];

a = analyticsStream;

  const clickEvent = () => ({
    action: 'Clicked',
    attrs: {
      ...analyticsData.other,
      ...analyticsData.events,
      event_navigation_browsing_method: 'click',
  }});

  const handleClick = (
    fireAnalyticsEvent
  ) => {
    fireAnalyticsEvent && fireAnalyticsEvent(clickEvent());
  };

  const renderKeyFact = (item, listIndex,  fireAnalyticsEvent, intersectObserverRef) => { 
    return(
    <BulletContainer key={`key-facts-${listIndex}`} ref={ intersectObserverRef}>
      <Bullet />
      <KeyFactsText
        item={item}
        listIndex={listIndex}
        onLinkPress={() => {}}
        onLinkPress={() => handleClick(fireAnalyticsEvent)}
      />
    </BulletContainer>
  )}

  return (
    <TrackingContextProvider
    analyticsStream={analyticsStream}
    context={{
      object: 'Key moments',
      attrs: {
        ...analyticsData.other
      }
    }}
    scrolledEvent={ {attrs: {
      ...analyticsData.events,
      event_navigation_browsing_method: 'scroll',
    }}}
  >
  {({ fireAnalyticsEvent,  intersectObserverRef }) => (
    <KeyFactsContainer>
      {title && <KeyFactsTitle>{title}</KeyFactsTitle>}
      {keyFactsItems.map((item, index) => renderKeyFact(item, index, fireAnalyticsEvent, intersectObserverRef))}
    </KeyFactsContainer>
    )}
    </TrackingContextProvider>
  );
};

KeyFacts.propTypes = propTypes;
KeyFacts.defaultProps = defaultProps;

export default withTrackScrollDepth(KeyFacts, {
  getAttrs: () => {

    return {
      ...analyticsData.other,
    };
  },
  trackingObjectName: "Article",
  ...analyticsData.events,
});

