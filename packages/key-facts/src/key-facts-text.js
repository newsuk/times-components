import React from "react";
import { Text } from "react-native";
import { TextLink } from "@times-components/link";
import { renderTree } from "@times-components/markup-forest";
import coreRenderers from "@times-components/markup";
import styleFactory from "./styles";
import { defaultProps, propTypes } from "./key-facts-prop-types";

const KeyFactsText = ({ item, listIndex, scale, onLinkPress }) => {
  const styles = styleFactory(scale);
  return (
    <Text style={styles.text}>
      {item.children.map((data, listItemIndex) =>
        renderTree(
          data,
          {
            ...coreRenderers,
            link(key, attributes, renderedChildren) {
              const { canonicalId, href: url, type } = attributes;
              return {
                element: (
                  <TextLink
                    key={key}
                    onPress={e =>
                      onLinkPress(e, {
                        canonicalId,
                        type,
                        url
                      })
                    }
                    style={styles.link}
                    url={url}
                  >
                    {renderedChildren}
                  </TextLink>
                )
              };
            }
          },
          `key-facts-${listIndex}-${listItemIndex}`
        )
      )}
    </Text>
  );
};

KeyFactsText.propTypes = propTypes;
KeyFactsText.defaultProps = defaultProps;

export default KeyFactsText;
