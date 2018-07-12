import React, { Fragment } from "react";
import PropTypes from "prop-types";

const KeyFactsContainer = ({ children }) => <Fragment>{children}</Fragment>;

KeyFactsContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default KeyFactsContainer;
