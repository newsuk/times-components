import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import withResponsiveStyles from "./responsive-styles";

const WithColours = withResponsiveStyles("div", {
  toSmall: () => "color: red",
  toMedium: () => "color: blue",
  toWide: () => "color: green",
  toHuge: () => "color: purple"
});

storiesOf("ResponsiveStyles", module).add("ResponsiveStyles", () => (
  <WithColours>Hello</WithColours>
));
