import React from "react";
import { Text, View } from "react-native";
import { TextLink } from "@times-components/link";
import { renderTree } from "@times-components/markup-forest";
import coreRenderers from "@times-components/markup";
import KeyFactsContainer from "./key-facts-container";
import KeyFactsTitle from "./key-facts-title";
import KeyFactsWrapper from "./key-facts-wrapper";
import { defaultProps, propTypes } from "./key-facts-prop-types";
import styles from "./styles";

const KeyFacts = ({ ast, onLinkPress }) => {
  const { children, attributes: { title } } = ast;
  const { children: keyFactsItems } = children[0];

  const renderTitle = () => {
    if (!title) return null;

    return <KeyFactsTitle title={title} />;
  };

  const renderKeyFact = (item, listIndex) => (
    <View key={`key-facts-${listIndex}`} style={styles.bulletContainer}>
      <View style={styles.bullet} />
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
KeyFacts.defaultProps = defaultProps;

export default KeyFacts;
