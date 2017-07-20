/* eslint-env browser */
import React from "react";
import { storiesOf } from "@storybook/react-native";

import Ad, { AdComposer } from "./ad.web";

export default () =>
storiesOf("Ad", module).add("render one ad in article page", () =>
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
);
  storiesOf("Ad", module).add("render two ads in article page", () =>
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
  );
