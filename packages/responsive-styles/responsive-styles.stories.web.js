import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import withResponsiveStyles from "./responsive-styles";

const WithColours = withResponsiveStyles("div", {
  base: () => "color: red;",
  smallUp: () => "color: orange;",
  mediumUp: () => "color: blue;",
  wideUp: () => "color: green;",
  hugeUp: () => "color: purple;"
});

storiesOf("ResponsiveStyles", module).add("ResponsiveStyles", () => (
  <WithColours>Hello</WithColours>
));
