import React from "react";
import { Text, View } from "react-native";
import { TextLink } from "@times-components/link";
import { renderTree } from "@times-components/markup";
import styles from "./styles";

const KeyFacts = ({ data }) => {
  const { data: keyFactsData } = data;
  const renderKeyFact = (keyFact, index) => {
    const { children } = keyFact;
    return (
      <View key={index} style={styles.container}>
        <View style={styles.bullet} />
        <Text style={styles.text}>
          {children.map(ast =>
            renderTree(ast, {
              link(key, attributes, children) {
                const url = attributes.href;
                return (
                  <TextLink
                    key={index}
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
            })
          )}
        </Text>
      </View>
    );
  };

  return keyFactsData.map((keyFact, index) => renderKeyFact(keyFact, index));
};

export default KeyFacts;
