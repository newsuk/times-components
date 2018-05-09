import React from "react";
import { Text } from "react-native";
import styles from "./styles";
import { ResponsiveName } from "./styles/responsive";

const Name = ({ name }) => (
  <ResponsiveName
      testID="topic-name"
      accessibilityLabel="topic-name"
      accessibilityRole="heading"
    >
    {name}
  </ResponsiveName>
);

export default Name;
