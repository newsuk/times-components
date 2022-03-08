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
  isLiveOrBreaking, data, type
}) => {
  const {
    children,
    attributes: { title }
  } = ast;
  const { children: keyFactsItems } = children[0];
  const analyticsData = {
    events: {
      event_navigation_name: "In-article component displayed: key moments",
      event_navigation_action: "navigation"
    },
    attrs: {
      component_type: "In-article component: key moments: static",
      component_name: title,
      section_details: section,
      article_parent_name: headline,
      other_details: isLiveOrBreaking
    }
  };

  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  console.log('type', type)
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  console.log('data', data)
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  console.log('key facts analytics stream',  analyticsStream)

  return (
    <TrackingContextProvider
      analyticsStream={analyticsStream}
      context={{}}
      scrolledEvent={{
        object: "KeyMoments",
        ...analyticsData.events,
        event_navigation_browsing_method: "scroll",
        attrs: {
          ...analyticsData.attrs
        }
      }}
    >
      {({ fireAnalyticsEvent, intersectObserverRef }) => (
        <KeyFactsContainer ref={intersectObserverRef}>
          {title && <KeyFactsTitle>{title}</KeyFactsTitle>}
          {keyFactsItems.map((keyFactItem, index) => (
            <KeyFactsText
              keyFactItem={keyFactItem}
              listIndex={index}
              fireAnalyticsEvent={fireAnalyticsEvent}
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
