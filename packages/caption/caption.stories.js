import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import Caption from "./caption";

storiesOf("Caption", module)
  .add("Without credits", () => <Caption text="This is a caption text" />)
  .add("With credits", () =>
    <Caption
      text="This is a caption text"
      credits="And these are just credits"
    />
  );
