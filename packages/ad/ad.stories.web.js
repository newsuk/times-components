/* eslint-env browser */
import React from "react";
import { View, Dimensions } from "react-native";
import { storiesOf } from "@storybook/react-native";

import Ad, { AdComposer } from "./ad.web";
import { getSlotConfig } from "./generate-config";

import Placeholder from './placeholder';
import TimesWatermark from './assets/TimesWatermark';

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
  )
  .add("render two ads in article page", () =>
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
  )
  .add("Placeholder", () => {
    const { width } = Dimensions.get("window");
    const config = getSlotConfig(
      "article",
      "intervention",
      width
    );
    return (<Placeholder config={config} />);
  })
  .add("TimesWatermark (Default)", () => <TimesWatermark width={832} height={300}/>)
  .add("TimesWatermark (MPU)", () => <TimesWatermark width={300} height={250}/>)
  .add("TimesWatermark (Billboard)", () => <TimesWatermark width={970} height={250}/>)
