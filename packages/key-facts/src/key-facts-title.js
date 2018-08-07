import React from "react";
import { Text } from "react-native";
import Context from "@times-components/context";
import propTypes from "./key-facts-title-prop-types";
import styles from "./styles";

const KeyFactsTitle = ({ title }) => (
  <Context.Consumer>
    {({ theme: { scale } }) => (
      <Text style={styles(scale).title}>{title.toUpperCase()}</Text>
    )}
  </Context.Consumer>
);

KeyFactsTitle.propTypes = propTypes;

export default KeyFactsTitle;
