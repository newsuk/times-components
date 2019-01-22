import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";

const ExampleChild = ({ children }) => <Text>{children}</Text>;
ExampleChild.displayName = "ExampleChild";

ExampleChild.propTypes = {
  children: PropTypes.node.isRequired
};

export default id => <ExampleChild id={id}>{id}</ExampleChild>;
