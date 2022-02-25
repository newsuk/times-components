import React from "react";
import { TrackingContextProvider } from "@times-components/ts-components";
import KeyFactsText from "./key-facts-text";
import props from "./key-facts-prop-types";
import { KeyFactsTitle, KeyFactsContainer } from "./styles";

const KeyFacts = ({
  ast,
  analyticsStream,
  section,
  headline,
  isLiveOrBreaking
}) => {
  const {
    children,
    attributes: { title }
  } = ast;
  const { children: keyFactsItems } = children[0];
  const analyticsData = {
    event: {
      event_navigation_name: "In-article component displayed: key moments",
      event_navigation_action: "navigation"
    },
    other: {
      component_type: "In-article component: key moments: static",
      component_name: title,
      section_details: section,
      article_parent_name: headline,
      other_details: isLiveOrBreaking
    }
  };
  return (
    <TrackingContextProvider
      analyticsStream={analyticsStream}
      context={{
        object: "Key moments",
        attrs: {
          ...analyticsData.other
        }
      }}
      scrolledEvent={{
        attrs: {
          ...analyticsData.events,
          event_navigation_browsing_method: "scroll"
        }
      }}
    >
      {({ fireAnalyticsEvent, intersectObserverRef }) => (
        <KeyFactsContainer>
          {title && <KeyFactsTitle>{title}</KeyFactsTitle>}
          {keyFactsItems.map((keyFactItem, index) => (
            <KeyFactsText
              keyFactItem={keyFactItem}
              listIndex={index}
              fireAnalyticsEvent={fireAnalyticsEvent}
              intersectObserverRef={intersectObserverRef}
              analyticsData={analyticsData}
            />
          ))}
        </KeyFactsContainer>
      )}
    </TrackingContextProvider>
  );
};

KeyFacts.propTypes = props;

export default KeyFacts;
