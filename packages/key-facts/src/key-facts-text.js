import React from "react";
import { Text } from "react-native";
import { TextLink } from "@times-components/link";
import { renderTree } from "@times-components/markup-forest";
import coreRenderers from "@times-components/markup";
import styles from "./styles";

const KeyFactsText = ({item, listIndex, scale, onLinkPress}) => (
  <Text style={styles(scale).text}>
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
                      style={styles().link}
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

export default KeyFactsText;
