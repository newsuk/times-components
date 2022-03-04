import React from "react";
import { renderTree } from "@times-components/markup-forest";
import coreRenderers from "@times-components/markup";
import props from "./key-facts-text-prop-types";
import { Text, KeyFactTextLink, BulletContainer, Bullet } from "./styles";

const KeyFactsText = ({
  keyFactItem,
  listIndex,
  intersectObserverRef,
  analyticsData,
  fireAnalyticsEvent
}) => (
  <BulletContainer key={`key-facts-${listIndex}`} ref={intersectObserverRef}>
    <Bullet />
    <Text>
      {keyFactItem.children.map((data, listItemIndex) =>
        renderTree(
          data,
          {
            ...coreRenderers,
            link(key, attributes, renderedChildren) {
              const { href: url } = attributes;
              return (
                <KeyFactTextLink
                  key={key}
                  onClick={() =>
                    fireAnalyticsEvent &&
                    fireAnalyticsEvent({
                      action: "Clicked",
                      ...analyticsData.events,
                      event_navigation_browsing_method: "click",
                      attrs: {
                        ...analyticsData.attrs
                      }
                    })
                  }
                  href={url}
                >
                  {renderedChildren}
                </KeyFactTextLink>
              );
            }
          },
          `key-facts-${listIndex}-${listItemIndex}`
        )
      )}
    </Text>
  </BulletContainer>
);

KeyFactsText.propTypes = props;

export default KeyFactsText;
