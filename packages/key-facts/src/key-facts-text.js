import React from "react";
import { renderTree } from "@times-components/markup-forest";
import coreRenderers from "@times-components/markup";
import { defaultProps, propTypes } from "./key-facts-text-prop-types";
import { Text, KeyFactTextLink } from "./styles";

const KeyFactsText = ({ item, listIndex, onLinkPress }) => (
  <Text>
    {item.children.map((data, listItemIndex) =>
      renderTree(
        data,
        {
          ...coreRenderers,
          link(key, attributes, renderedChildren) {
            const { canonicalId, href: url, type } = attributes;
            return (
              <KeyFactTextLink
                data-testid="KeyFactTextLink"
                key={key}
                onPress={e =>
                  onLinkPress(e, {
                    canonicalId,
                    type,
                    url
                  })
                }
                url={url}
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
);

KeyFactsText.propTypes = propTypes;
KeyFactsText.defaultProps = defaultProps;

export default KeyFactsText;
