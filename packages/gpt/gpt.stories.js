/* eslint-env browser */

import React from "react";
import { storiesOf } from "@storybook/react-native";

import AdComposer from "./ad-composer";
import Ad from "./ad";

storiesOf("GPT", module).add("render two ads in article page", () =>
  // Hack, gpt map sizes don't seem to work inside iframes as such this is a
  // temporary fix, while waiting for https://github.com/storybooks/storybook/issues/862
  <div>
    <a href={`/iframe.html${window.document.location.search}`} target="_parent">
      Render ads
    </a>
    <p>(Please remember to turn off your ad blocker.)</p>
    <AdComposer section="article" networkId="25436805">
      <Ad code="ad-header" />
      <Ad code="intervention" />
    </AdComposer>
  </div>
);
