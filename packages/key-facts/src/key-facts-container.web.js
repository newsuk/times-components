import React from "react";
import PropTypes from "prop-types";
import KeyFactsResponsiveContainer from "./styles/responsive";

const KeyFactsContainer = ({ children }) => (
  <KeyFactsResponsiveContainer>{children}</KeyFactsResponsiveContainer>
);

KeyFactsContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default KeyFactsContainer;
