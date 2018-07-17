import React from "react";
import { KeyFactsResponsiveWrapper } from "./styles/responsive";
import propTypes from "./key-facts-shared-prop-types";

const KeyFactsWrapper = ({ children }) => (
  <KeyFactsResponsiveWrapper>{children}</KeyFactsResponsiveWrapper>
);

KeyFactsWrapper.propTypes = propTypes;

export default KeyFactsWrapper;
