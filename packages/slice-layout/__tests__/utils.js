import React from "react";
import { TcText } from "@times-components/utils";
import PropTypes from "prop-types";

const ExampleChild = ({ children }) => <TcText>{children}</TcText>;
ExampleChild.displayName = "ExampleChild";

ExampleChild.propTypes = {
  children: PropTypes.node.isRequired
};

export default id => <ExampleChild id={id}>{id}</ExampleChild>;
