import "react-native";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import BrightcoveVideoLauncher from "./brightcove-video-launcher";

const policyKey =
  "BCpkADawqM0NK0Rq8n6sEQyWykemrqeSmIQqqVt3XBrdpl8TYlvqN3hwKphBJRnkPgx6WAbozCW_VgTOBCNf1AQRh8KnmXSXfveQalRc5-pyNlSod5XzP99If2U";
const accountId = "57838016001";
const videoId = "4084164751001";

storiesOf(
  "BrightcoveVideoLauncher",
  module
).add("BrightcoveVideoLauncher", () =>
  <BrightcoveVideoLauncher
    policyKey={policyKey}
    videoId={videoId}
    accountId={accountId}
  />
);
