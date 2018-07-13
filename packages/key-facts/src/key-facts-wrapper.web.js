import React from "react";
import PropTypes from "prop-types";
import { KeyFactsResponsiveWrapper } from "./styles/responsive";

const KeyFactsWrapper = ({ children }) => (
  <KeyFactsResponsiveWrapper>{children}</KeyFactsResponsiveWrapper>
);

KeyFactsWrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default KeyFactsWrapper;
