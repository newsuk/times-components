import React from "react";
import { Text, View } from "react-native";
import { TextLink } from "@times-components/link";
import { renderTree } from "@times-components/markup";
import KeyFactsContainer from "./key-facts-container";
import KeyFactsTitle from "./key-facts-title";
import KeyFactsWrapper from "./key-facts-wrapper";
import { propTypes, defaultProps } from "./key-facts-prop-types";
import styles from "./styles";

const KeyFacts = ({ items, onLinkPress, title }) => {
  const renderKeyFact = (item, index) => (
    <View key={`key-facts-${index}`} style={styles.container}>
      <View style={styles.bullet} />
      <Text style={styles.text}>
        {item.children.map((ast, indx) =>
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

  return (
    <KeyFactsContainer>
      <KeyFactsTitle title={title} />
      <KeyFactsWrapper>{items.map((item, index) => renderKeyFact(item, index))}</KeyFactsWrapper>
    </KeyFactsContainer>
  );
};

KeyFacts.propTypes = propTypes;
KeyFacts.defaultProps = defaultProps;

export default KeyFacts;
