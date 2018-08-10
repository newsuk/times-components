import React from "react";
import { View } from "react-native";
import Context from "@times-components/context";
import KeyFactsContainer from "./key-facts-container";
import KeyFactsText from "./key-facts-text";
import KeyFactsTitle from "./key-facts-title";
import KeyFactsWrapper from "./key-facts-wrapper";
import { defaultProps, propTypes } from "./key-facts-prop-types";
import styleFactory from "./styles";

const KeyFacts = ({ ast, onLinkPress }) => {
  const { children, attributes: { title } } = ast;
  const { children: keyFactsItems } = children[0];

  const renderTitle = styles => {
    if (!title) return null;

    return <KeyFactsTitle styles={styles} title={title} />;
  };

  const renderKeyFact = (item, listIndex, styles) => (
    <View key={`key-facts-${listIndex}`} style={styles.bulletContainer}>
      <View style={styles.bullet} />
      <KeyFactsText
        item={item}
        listIndex={listIndex}
        onLinkPress={onLinkPress}
        styles={styles}
      />
    </View>
  );

  return (
    <Context.Consumer>
      {({ theme: { scale, sectionColour } }) => {
        const styles = styleFactory(scale, sectionColour);
        return (
          <KeyFactsContainer>
            {renderTitle(styles)}
            <KeyFactsWrapper>
              {keyFactsItems.map((item, index) =>
                renderKeyFact(item, index, styles)
              )}
            </KeyFactsWrapper>
          </KeyFactsContainer>
        );
      }}
    </Context.Consumer>
  );
};

KeyFacts.propTypes = propTypes;
KeyFacts.defaultProps = defaultProps;

export default KeyFacts;
