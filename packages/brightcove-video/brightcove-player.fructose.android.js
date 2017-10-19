/* globals withComponent test expect element by waitFor beforeEach */
import { View } from "react-native";
import React from "react";
import BrightcovePlayer from "./brightcove-player";
import VideoWithExternalControls from "./fixtures/video-with-external-controls";

const policyKey =
  "BCpkADawqM0NK0Rq8n6sEQyWykemrqeSmIQqqVt3XBrdpl8TYlvqN3hwKphBJRnkPgx6WAbozCW_VgTOBCNf1AQRh8KnmXSXfveQalRc5-pyNlSod5XzP99If2U";
const accountId = "57838016001";
const videoId = "4084164751001";

withComponent(
  <BrightcovePlayer
    fructoseID="brightcove video renders"
    policyKey={policyKey}
    videoId={videoId}
    accountId={accountId}
  />,
  "video with external controls",
  async fructose => {
    beforeEach(async () => {
      await fructose.loadComponent();
    });

    test("renders", async () => {
      await d.waitForElementByXPath('//*[@content-desc="Play" and @clickable="true"]', 10000);
    });
  }
);

withComponent(
  <VideoWithExternalControls
    fructoseID="brightcove with external controls"
    policyKey={policyKey}
    videoId={videoId}
    accountId={accountId}
  />,
  "video with external controls",
  async fructose => {
    beforeEach(async () => {
      await fructose.loadComponent();
    });

    test(
      "video plays when external play button is pressed",
      async () => {
        await d.waitForElementByXPath('//*[@text="play"]', 2000);
        const e = await d.elementByXPath('//*[@text="play"]')
        await d.tapElement(e);
        await d.waitForElementByXPath('//*[@text="0:08"]', 10000)
      }, 150000
    );
  }
);