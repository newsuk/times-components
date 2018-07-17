import React from "react";
import KeyFactsContainer from "./key-facts-container";
import KeyFactsTitle from "./key-facts-title";
import KeyFactsWrapper from "./key-facts-wrapper";
import KeyFactsBullet from "./key-facts-bullet";
import { propTypes, defaultProps } from "./key-facts-prop-types";

const KeyFacts = ({ children, title }) => {
  const renderTitle = () => {
    if (!title) return null;

    return <KeyFactsTitle title={title} />;
  };

  return (
    <KeyFactsContainer>
      {renderTitle()}
      <KeyFactsWrapper>{children}</KeyFactsWrapper>
    </KeyFactsContainer>
  );
};

KeyFacts.propTypes = propTypes;
KeyFacts.defaultProps = defaultProps;

export { KeyFactsBullet };
export default KeyFacts;
