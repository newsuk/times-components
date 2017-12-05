import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import withResponsiveStyles from "./responsive-styles";

const Enhanced = withResponsiveStyles("div");

storiesOf("ResponsiveStyles", module).add("ResponsiveStyles", () => (
  <Enhanced>Test</Enhanced>
));
