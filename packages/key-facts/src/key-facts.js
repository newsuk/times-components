import React from "react";
import KeyFactsText from "./key-facts-text";
import { defaultProps, propTypes } from "./key-facts-prop-types";
import {
  BulletContainer,
  Bullet,
  KeyFactsTitle,
  KeyFactsContainer
} from "./styles";

const KeyFacts = ({ ast, onLinkPress }) => {
  const {
    children,
    attributes: { title }
  } = ast;
  const { children: keyFactsItems } = children[0];

  const renderKeyFact = (item, listIndex) => (
    <BulletContainer key={`key-facts-${listIndex}`}>
      <Bullet />
      <KeyFactsText
        item={item}
        listIndex={listIndex}
        onLinkPress={onLinkPress}
      />
    </BulletContainer>
  );

  return (
    <KeyFactsContainer>
      {title && <KeyFactsTitle>{title}</KeyFactsTitle>}
      {keyFactsItems.map((item, index) => renderKeyFact(item, index))}
    </KeyFactsContainer>
  );
};

KeyFacts.propTypes = propTypes;
KeyFacts.defaultProps = defaultProps;

export default KeyFacts;
