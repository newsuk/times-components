import React, { Fragment } from "react";
import propTypes from "./key-facts-container-prop-types";

const KeyFactsContainer = ({ children }) => <Fragment>{children}</Fragment>;

KeyFactsContainer.propTypes = propTypes;

export default KeyFactsContainer;
