import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import { checkA11y } from "@storybook/addon-a11y";
import withResponsiveStyles from "./responsive-styles";

const WithColours = withResponsiveStyles("div", {
  base: () => "color: red;",
  smallUp: () => "color: orange;",
  mediumUp: () => "color: blue;",
  wideUp: () => "color: green;",
  hugeUp: () => "color: purple;"
});

storiesOf("Helpers/ResponsiveStyles", module)
  .addDecorator(checkA11y)
  .add("ResponsiveStyles", () => <WithColours>Hello</WithColours>);
