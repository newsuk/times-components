import "react-native";
import React from "react";
import withResponsiveStyles from "./src/responsive-styles";

const WithColours = withResponsiveStyles("div", {
  base: () => "color: red;",
  smallUp: () => "color: orange;",
  mediumUp: () => "color: blue;",
  wideUp: () => "color: green;",
  hugeUp: () => "color: purple;"
});

export default {
  name: "Helpers/ResponsiveStyles",
  platform: "web",
  children: [
    {
      type: "story",
      name: "ResponsiveStyles",
      component: () => <WithColours>Hello</WithColours>
    }
  ]
};
