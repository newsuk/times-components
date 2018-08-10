import React from "react";
import { KeyFactsResponsiveContainer } from "./styles/responsive";
import propTypes from "./key-facts-shared-prop-types";
import styleFactory from "./styles";

const styles = styleFactory();

const KeyFactsContainer = ({ children }) => (
  <KeyFactsResponsiveContainer style={styles.container}>
    {children}
  </KeyFactsResponsiveContainer>
);

KeyFactsContainer.propTypes = propTypes;

export default KeyFactsContainer;
