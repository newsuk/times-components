import React from "react";
import { Text, View } from "react-native";
import { TextLink } from "@times-components/link";
import { renderTree } from "@times-components/markup";
import KeyFactsContainer from "./key-facts-container";
import KeyFactsTitle from "./key-facts-title";
import KeyFactsWrapper from "./key-facts-wrapper";
import { propTypes, defaultProps } from "./key-facts-prop-types";
import styles from "./styles";

const KeyFacts = ({ ast: keyFactsAST, onLinkPress, title }) => {
  const renderTitle = () => {
    if (!title) return null;

    return <KeyFactsTitle title={title} />;
  };

  const renderKeyFact = (item, index) => (
    <View key={`key-facts-${index}`} style={styles.container}>
      <View style={styles.bulletContainer}>
        <View style={styles.bullet} />
        <Text style={styles.text}>
          {item.children.map((ast, indx) =>
            renderTree(
              ast,
              {
                link(key, attributes, children) {
                  const url = attributes.href;
                  return {
                    element: (
                      <TextLink
                        key={`${index}${key}`}
                        onPress={e =>
                          onLinkPress(e, {
                            canonicalId: attributes.canonicalId,
                            type: attributes.type,
                            url: attributes.href
                          })
                        }
                        style={styles.link}
                        url={url}
                      >
                        {children}
                      </TextLink>
                    )
                  };
                },
                listElement(key, attributes, children) {
                  return {
                    element: children
                  };
                }
              },
              `key-facts-${index}-${indx}`
            )
          )}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyFactsContainer>
      {renderTitle()}
      <KeyFactsWrapper>
        {keyFactsAST.map((item, index) => renderKeyFact(item, index))}
      </KeyFactsWrapper>
    </KeyFactsContainer>
  );
};

KeyFacts.propTypes = propTypes;
KeyFacts.defaultProps = defaultProps;

export default KeyFacts;
