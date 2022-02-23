import React from "react";
import { renderTree } from "@times-components/markup-forest";
import coreRenderers from "@times-components/markup";
import { defaultProps, propTypes } from "./key-facts-text-prop-types";
import { Text, KeyFactTextLink, BulletContainer, Bullet } from "./styles";

const KeyFactsText = (
  item,
  listIndex,
  fireAnalyticsEvent,
  intersectObserverRef,
  analyticsData
) => (
  <BulletContainer key={`key-facts-${listIndex}`} ref={intersectObserverRef}>
    <Bullet />
    <Text>
      {item.children.map((data, listItemIndex) =>
        renderTree(
          data,
          {
            ...coreRenderers,
            link(key, attributes, renderedChildren) {
              const { href: url } = attributes;

              return (
                <KeyFactTextLink
                  data-testid="KeyFactTextLink"
                  key={key}
                  onClick={() =>
                    fireAnalyticsEvent &&
                    fireAnalyticsEvent({
                      action: "Clicked",
                      attrs: {
                        ...analyticsData.other,
                        ...analyticsData.events,
                        event_navigation_browsing_method: "click"
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

KeyFactsText.propTypes = propTypes;
KeyFactsText.defaultProps = defaultProps;

export default KeyFactsText;
