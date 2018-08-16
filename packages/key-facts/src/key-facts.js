import React from "react";
import { View } from "react-native";
import Context from "@times-components/context";
import styleguide, { colours } from "@times-components/styleguide";
import KeyFactsContainer from "./key-facts-container";
import KeyFactsText from "./key-facts-text";
import KeyFactsTitle from "./key-facts-title";
import KeyFactsWrapper from "./key-facts-wrapper";
import { defaultProps, propTypes } from "./key-facts-prop-types";
import styles from "./styles";

const KeyFacts = ({ ast, onLinkPress }) => {
  const { children, attributes: { title } } = ast;
  const { children: keyFactsItems } = children[0];

  const renderTitle = (color, fontSize) => {
    if (!title) return null;

    return <KeyFactsTitle color={color} fontSize={fontSize} title={title} />;
  };

  const renderKeyFact = (item, listIndex, fontStyle, backgroundColor) => (
    <View key={`key-facts-${listIndex}`} style={styles.bulletContainer}>
      <View style={[styles.bullet, { backgroundColor }]} />
      <KeyFactsText
        fontStyle={fontStyle}
        item={item}
        listIndex={listIndex}
        onLinkPress={onLinkPress}
      />
    </View>
  );

  return (
    <Context.Consumer>
      {({ theme: { scale, sectionColour } }) => {
        const themedStyles = styleguide({ scale });

        return (
          <KeyFactsContainer>
            {renderTitle(
              sectionColour || colours.functional.brandColour,
              themedStyles.fontSizes.cardMetaMobile
            )}
            <KeyFactsWrapper>
              {keyFactsItems.map((item, index) =>
                renderKeyFact(
                  item,
                  index,
                  themedStyles.fontFactory({
                    font: "body",
                    fontSize: "secondary"
                  }),
                  sectionColour || colours.functional.bullet
                )
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
