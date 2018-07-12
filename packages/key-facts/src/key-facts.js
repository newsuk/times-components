import React from "react";
import { Text, View } from "react-native";
import { TextLink } from "@times-components/link";
import { renderTree } from "@times-components/markup";
import styles from "./styles";

const KeyFacts = ({ data, onLinkPress }) => {
  const { data: keyFactsData } = data;
  const renderKeyFact = (keyFact, index) => (
    <View key={`key-facts-${index}`} style={styles.container}>
      <View style={styles.bullet} />
      <Text style={styles.text}>
        {keyFact.children.map((ast, indx) =>
          renderTree(
            ast,
            {
              link(key, attributes, children) {
                const url = attributes.href;
                return (
                  <TextLink
                    key={`${index}${key}`}
                    onPress={e =>
                      onLinkPress(e, {
                        url: attributes.href,
                        type: attributes.type,
                        canonicalId: attributes.canonicalId
                      })
                    }
                    url={url}
                  >
                    {children}
                  </TextLink>
                );
              }
            },
            `key-facts-${index}${indx}`
          )
        )}
      </Text>
    </View>
  );

  return keyFactsData.map((keyFact, index) => renderKeyFact(keyFact, index));
};

export default KeyFacts;
