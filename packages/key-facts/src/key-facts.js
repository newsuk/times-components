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
  const styles = styleFactory();

  const renderTitle = () => {
    if (!title) return null;

    return <KeyFactsTitle title={title} />;
  };

  const renderKeyFact = (item, listIndex) => (
    <View key={`key-facts-${listIndex}`} style={styles.bulletContainer}>
      <View style={styles.bullet} />
      <Context.Consumer>
        {({ theme: { scale } }) => (
          <KeyFactsText
            item={item}
            listIndex={listIndex}
            onLinkPress={onLinkPress}
            scale={scale}
          />
        )}
      </Context.Consumer>
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
