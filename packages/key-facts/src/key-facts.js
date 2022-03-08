import React from "react";
import { TrackingContextProvider } from "@times-components/ts-components";

import KeyFactsText from "./key-facts-text";
import props from "./key-facts-prop-types";

import { KeyFactsTitle, KeyFactsContainer } from "./styles";

const KeyFacts = ({ ast, section, headline, isLiveOrBreaking }) => {
  const {
    children,
    attributes: { title }
  } = ast;

  const { children: keyFactsItems } = children[0];

  console.log("=================");
  console.log("KeyMoments");
  console.log("isLiveOrBreaking", isLiveOrBreaking);
  console.log("section", section);

  return (
    <TrackingContextProvider
      context={{
        object: "KeyMoments",
        attrs: {
          component_type: "in-article component: key moments: static",
          event_navigation_action: "navigation",
          component_name: headline
        }
      }}
      scrolledEvent={{
        attrs: {
          event_navigation_name: "in-article component displayed : key moments",
          event_navigation_browsing_method: "scroll"
        }
      }}
    >
      {({ fireAnalyticsEvent, intersectObserverRef }) => (
        <KeyFactsContainer ref={intersectObserverRef}>
          {title && <KeyFactsTitle>{title}</KeyFactsTitle>}
          {keyFactsItems.map((keyFactItem, index) => (
            <KeyFactsText
              listIndex={index}
              keyFactItem={keyFactItem}
              fireAnalyticsEvent={fireAnalyticsEvent}
            />
          ))}
        </KeyFactsContainer>
      )}
    </TrackingContextProvider>
  );
};

KeyFacts.propTypes = props;

export default KeyFacts;
