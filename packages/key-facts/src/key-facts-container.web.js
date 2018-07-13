import React from "react";
import { KeyFactsResponsiveContainer } from "./styles/responsive";
import propTypes from "./key-facts-container-prop-types";

const KeyFactsContainer = ({ children }) => (
  <KeyFactsResponsiveContainer>{children}</KeyFactsResponsiveContainer>
);

KeyFactsContainer.propTypes = propTypes;

export default KeyFactsContainer;
