import React from "react";
import { renderTree } from "@times-components/markup-forest";
import coreRenderers from "@times-components/markup";
import props from "./key-facts-text-prop-types";
import { Text, KeyFactTextLink, BulletContainer, Bullet } from "./styles";

const getTitle = data => {
  if (data.children.length === 1) return data.children[0].attributes.value;

  const linkText = data.children.map(child => child.attributes.value);
  const title = linkText.join(" ");
  return title.length > 0 ? title : " ";
};

const KeyFactsText = ({ listIndex, keyFactItem, fireAnalyticsEvent }) => (
  <BulletContainer key={`key-facts-${listIndex}`}>
    <Bullet />
    <Text>
      {keyFactItem.children.map((data, listItemIndex) =>
        renderTree(
          data,
          {
            ...coreRenderers,
            link(key, attributes, renderedChildren) {
              const { href: url } = attributes;
              const title = getTitle(data);

              return (
                <KeyFactTextLink
                  key={key}
                  onClick={() => {
                    if (fireAnalyticsEvent) {
                      fireAnalyticsEvent({
                        action: "Clicked",
                        attrs: {
                          event_navigation_name:
                            "in-article component clicked : key moments",
                          event_navigation_browsing_method: "click",
                          article_name: title
                        }
                      });
                    }
                  }}
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
export { getTitle };
