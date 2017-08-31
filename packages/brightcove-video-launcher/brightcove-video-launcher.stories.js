import "react-native";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import BrightcoveVideoLauncher from "./brightcove-video-launcher";

import customPlayIcon from "./fixtures/customPlayIcon.png";

const policyKey =
  "BCpkADawqM0NK0Rq8n6sEQyWykemrqeSmIQqqVt3XBrdpl8TYlvqN3hwKphBJRnkPgx6WAbozCW_VgTOBCNf1AQRh8KnmXSXfveQalRc5-pyNlSod5XzP99If2U";
const accountId = "57838016001";
const videoId = "4084164751001";
const posterImageURI =
  "https://clips.news.co.uk/thetimes/p5dzhoYzE6kYmndXxYdBsfnnyMzDVTyD/Ut_HKthATH4eww8X4xMDoxOmFkOxyVqc";

storiesOf("BrightcoveVideoLauncher", module)
  .add("with default poster & icon", () =>
    <BrightcoveVideoLauncher
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
    />
  )
  .add("with custom poster", () =>
    <BrightcoveVideoLauncher
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      poster={{ uri: posterImageURI }}
    />
  )
  .add("with custom poster & play icon", () =>
    <BrightcoveVideoLauncher
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      poster={{ uri: posterImageURI }}
      playIcon={customPlayIcon}
    />
  );
