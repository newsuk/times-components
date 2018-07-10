/* globals withComponent test beforeEach driver */
import React from "react";
import BrightcovePlayer from "./src/brightcove-player";
import VideoWithExternalControls from "./fixtures/video-with-external-controls";

const policyKey =
  "BCpkADawqM0NK0Rq8n6sEQyWykemrqeSmIQqqVt3XBrdpl8TYlvqN3hwKphBJRnkPgx6WAbozCW_VgTOBCNf1AQRh8KnmXSXfveQalRc5-pyNlSod5XzP99If2U";
const accountId = "57838016001";
const videoId = "4084164751001";

withComponent(
  <BrightcovePlayer
    accountId={accountId}
    fructoseID="brightcove video renders"
    policyKey={policyKey}
    videoId={videoId}
  />,
  "video with external controls",
  async fructose => {
    beforeEach(async () => {
      await driver.resetApp();
      await fructose.loadComponent();
    });

    test("renders", async () => {
      await driver.waitForElementByXPath(
        '//*[@content-desc="Play" and @clickable="true"]',
        10000
      );
    });
  }
);

withComponent(
  <VideoWithExternalControls
    accountId={accountId}
    fructoseID="brightcove with external controls"
    policyKey={policyKey}
    videoId={videoId}
  />,
  "video with external controls",
  async fructose => {
    beforeEach(async () => {
      await fructose.loadComponent();
    });

    test(
      "video plays when external play button is pressed",
      async () => {
        await driver.waitForElementByXPath('//*[@text="play"]', 2000);
        const e = await driver.elementByXPath('//*[@text="play"]');
        await driver.tapElement(e);
        await driver.waitForElementByXPath('//*[@text="0:08"]', 15000);
      },
      150000
    );
  }
);
