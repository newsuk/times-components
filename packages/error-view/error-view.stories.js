/* eslint import/no-unresolved: "off" */

import React from "react";
import { storiesOf } from "@storybook/react-native";
import { decorateAction } from "@storybook/addon-actions";

import Error from "./error-view";
import BrightcoveVideo from "../brightcove-video/brightcove-video";

const policyId =
  "BCpkADawqM0NK0Rq8n6sEQyWykemrqeSmIQqqVt3XBrdpl8TYlvqN3hwKphBJRnkPgx6WAbozCW_VgTOBCNf1AQRh8KnmXSXfveQalRc5-pyNlSod5XzP99If2U";
const accountId = "57838016001";
const videoId = "4084164751001";

const firstArgJSONAction = decorateAction([args => [JSON.stringify(args[0])]]);

storiesOf("ErrorView", module)
  .add("Working Video", () =>
    <Error onError={firstArgJSONAction("error")} width={320} height={180}>
      <BrightcoveVideo
        policyId={policyId}
        videoId={videoId}
        accountId={accountId}
      />
    </Error>
  )
  .add("Video Error", () =>
    <Error onError={firstArgJSONAction("error")} width={320} height={180}>
      <BrightcoveVideo policyId={policyId} videoId="x" accountId={accountId} />
    </Error>
  )
  .add("Passing through change events", () =>
    <Error onChange={firstArgJSONAction("change")} width={320} height={180}>
      <BrightcoveVideo
        policyId={policyId}
        videoId={videoId}
        accountId={accountId}
      />
    </Error>
  );
