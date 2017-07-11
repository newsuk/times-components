import React from "react";
import { storiesOf } from "@storybook/react-native";
import TimesBrightcove from "./times-brightcove";

const policyId =
  "BCpkADawqM0NK0Rq8n6sEQyWykemrqeSmIQqqVt3XBrdpl8TYlvqN3hwKphBJRnkPgx6WAbozCW_VgTOBCNf1AQRh8KnmXSXfveQalRc5-pyNlSod5XzP99If2U";
const accountId = "57838016001";
const videoId = "4084164751001";

storiesOf("TimesBrightcove", module)
  .add("Default values", () =>
    <TimesBrightcove
      policyId={policyId}
      videoId={videoId}
      accountId={accountId}
    />
  )
  .add("Big player", () =>
    <TimesBrightcove
      width={800}
      height={600}
      policyId={policyId}
      videoId={videoId}
      accountId={accountId}
    />
  );
