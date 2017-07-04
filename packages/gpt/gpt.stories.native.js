import React from "react";
import { storiesOf } from "@storybook/react-native";

import Ad from "./ad.native";

export default () =>
  storiesOf("GPT", module).add("render one native ad", () =>
    <Ad code="ad-header" section="article" />
  );
