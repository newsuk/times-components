import React from "react";
import { Text, View } from "react-native";
import { TextLink } from "@times-components/link";
import { renderTree } from "@times-components/markup";
import KeyFactsContainer from "./key-facts-container";
import KeyFactsTitle from "./key-facts-title";
import KeyFactsWrapper from "./key-facts-wrapper";
import propTypes from "./key-facts-prop-types";
import styles from "./styles";

const KeyFacts = ({ ast, onLinkPress }) => {
  const { children, attributes: { title } } = ast;
  const { children: keyFactsItems } = children[0];

  const renderTitle = () => {
    if (!title) return null;

    return <KeyFactsTitle title={title} />;
  };

  const renderKeyFact = (item, index) => (
    <View key={`key-facts-${index}`} style={styles.container}>
      <View style={styles.bulletContainer}>
        <View style={styles.bullet} />
        <Text style={styles.text}>
          {item.children.map((data, indx) =>
            renderTree(
              data,
              {
                link(key, atts, renderedChildren) {
                  const { canonicalId, href: url, type } = atts;
                  return {
                    element: (
                      <TextLink
                        key={`${index}${key}`}
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
        {keyFactsItems.map((item, index) => renderKeyFact(item, index))}
      </KeyFactsWrapper>
    </KeyFactsContainer>
  );
};

KeyFacts.propTypes = propTypes;

export default KeyFacts;
