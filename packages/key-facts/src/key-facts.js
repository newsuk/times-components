import React from "react";
import { TrackingContextProvider } from "@times-components/ts-components";

import KeyFactsText from "./key-facts-text";
import props from "./key-facts-prop-types";

import { KeyFactsTitle, KeyFactsContainer } from "./styles";

// Function to convert key items incorrectly marked as "paywall" into list items
function formatPaywallItems (items) {
  return [...items].map(item => (item.name === "paywall" ? {...item.children[0]} : {
      ...item, 
      children: item.children.map (i => i.name === "paywall" ? ({...i.children[0]}) : i)
    }))
  }

const KeyFacts = ({ ast, section, headline, isLiveOrBreaking }) => {
  const {
    children,
    attributes: { title }
  } = ast;

  const { children: keyFactsItems } = children[0];
  const formattedKeyFactItems = formatPaywallItems(keyFactsItems)

  const articleFlag = isLiveOrBreaking
    ? isLiveOrBreaking.toLowerCase()
    : "no flag";

  return (
    <TrackingContextProvider
      context={{
        object: "KeyMoments",
        attrs: {
          component_type: "in-article component: key moments: interactive",
          event_navigation_action: "navigation",
          component_name: title,
          section_details: `section : ${section}`,
          article_name: headline,
          article_flag: articleFlag
        }
      }}
      scrolledEvent={{
        action: "Scrolled",
        attrs: {
          event_navigation_name: "in-article component displayed : key moments",
          event_navigation_browsing_method: "scroll"
        }
      }}
    >
      {({ fireAnalyticsEvent, intersectObserverRef }) => (
        <KeyFactsContainer ref={intersectObserverRef}>
          {title && <KeyFactsTitle>{title}</KeyFactsTitle>}
          {formattedKeyFactItems.map((keyFactItem, index) => (
            <KeyFactsText
              listIndex={index}
              keyFactItem={keyFactItem}
              fireAnalyticsEvent={fireAnalyticsEvent}
              articleFlag={articleFlag}
            />
          ))}
        </KeyFactsContainer>
      )}
    </TrackingContextProvider>
  );
};

KeyFacts.propTypes = props;

export default KeyFacts;
