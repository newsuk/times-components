import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import HTMLView from "./react-native-web-html-view";

storiesOf("HTMLView", module).add("HTMLView", () =>
  <HTMLView value={"<p>Hello, <i>world!</i></p>"} />
);
