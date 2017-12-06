/* eslint-env browser */
import React from "react";
import { storiesOf } from "@storybook/react-native";
import Ad, { AdComposer } from "./ad.web";

import Placeholder from "./placeholder";

export default () =>
  storiesOf("Advertisement", module)
    .add("render one ad in article page", () => (
      // Hack, gpt map sizes don't seem to work inside iframes as such this is a
      // temporary fix, while waiting for https://github.com/storybooks/storybook/issues/862
      <div>
        <a
          href={`/iframe.html${window.top.location.search}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Render ads
        </a>
        <AdComposer section="article" networkId="25436805">
          <Ad code="intervention" />
        </AdComposer>
      </div>
    ))
    .add("render two ads in article page", () => (
      // Hack, gpt map sizes don't seem to work inside iframes as such this is a
      // temporary fix, while waiting for https://github.com/storybooks/storybook/issues/862
      <div>
        <a
          href={`/iframe.html${window.top.location.search}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Render ads
        </a>
        <AdComposer section="article" networkId="25436805">
          <Ad code="ad-header" />
          <Ad code="intervention" />
        </AdComposer>
      </div>
    ))
    .add("Placeholder (300x250 - MPU)", () => (
      <Placeholder width={300} height={250} />
    ))
    .add("Placeholder (728x90 - Default)", () => (
      <Placeholder width={728} height={90} />
    ))
    .add("Placeholder (970x250 - Billboard)", () => (
      <Placeholder width={970} height={250} />
    ));
