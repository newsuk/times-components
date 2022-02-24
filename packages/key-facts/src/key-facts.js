import React from "react";
import { TrackingContextProvider } from "@times-components/ts-components";
import KeyFactsText from "./key-facts-text";
import { defaultProps, propTypes } from "./key-facts-prop-types";
import { KeyFactsTitle, KeyFactsContainer } from "./styles";

const KeyFacts = ({ ast, analyticsStream, section, headline }) => {
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
      article_parent_name: headline
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
          {keyFactsItems.map((keyFactItem, index) =>
            KeyFactsText(
              keyFactItem,
              index,
              fireAnalyticsEvent,
              intersectObserverRef,
              analyticsData
            )
          )}
        </KeyFactsContainer>
      )}
    </TrackingContextProvider>
  );
};

KeyFacts.propTypes = propTypes;
KeyFacts.defaultProps = defaultProps;

export default KeyFacts;
