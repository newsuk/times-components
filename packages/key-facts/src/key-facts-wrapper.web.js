import React from "react";
import { KeyFactsResponsiveWrapper } from "./styles/responsive";
import propTypes from "./key-facts-container-prop-types";

const KeyFactsWrapper = ({ children }) => (
  <KeyFactsResponsiveWrapper>{children}</KeyFactsResponsiveWrapper>
);

KeyFactsWrapper.propTypes = propTypes;

export default KeyFactsWrapper;
