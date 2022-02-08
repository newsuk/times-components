import React from "react";
import KeyFactsText from "./key-facts-text";
import { defaultProps, propTypes } from "./key-facts-prop-types";
import { KeyFactTextLink, BulletContainer, Bullet, KeyFactsTitle, KeyFactsContainer } from './styles';

const KeyFacts = ({ ast, onLinkPress }) => {
  const {
    children,
    attributes: { title }
  } = ast;
  const { children: keyFactsItems } = children[0];

  const renderKeyFact = (item, listIndex, itemCount) => {
    if(itemCount >= 3) {
      return (
        <KeyFactTextLink>
          <BulletContainer key={`key-facts-${listIndex}`} data-testid="hi bibi">
            <Bullet />
            <KeyFactsText
              item={item}
              listIndex={listIndex}
              onLinkPress={onLinkPress}
            />
          </BulletContainer>
        </KeyFactTextLink>
      )
    }
    return (
      <BulletContainer key={`key-facts-${listIndex}`} data-testid="hi bibi">
            <Bullet />
            <KeyFactsText
              item={item}
              listIndex={listIndex}
              onLinkPress={onLinkPress}
            />
      </BulletContainer>
    )
  };
const itemCount = keyFactsItems.length;

        return (
          <KeyFactsContainer>
            {title && <KeyFactsTitle>{title}</KeyFactsTitle>}
              {keyFactsItems.map((item, index) =>
                renderKeyFact(
                  item,
                  index,
                  itemCount
                )
              )}
          </KeyFactsContainer>
        );
};

KeyFacts.propTypes = propTypes;
KeyFacts.defaultProps = defaultProps;

export default KeyFacts;
