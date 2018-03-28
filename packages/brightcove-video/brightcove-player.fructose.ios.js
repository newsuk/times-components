/* globals withComponent test expect element by waitFor beforeEach device */
import { View } from "react-native";
import React from "react";
import BrightcovePlayer from "./src/brightcove-player";
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
  "brightcove video",
  async fructose => {
    beforeEach(async () => {
      await device.launchApp({ newInstance: true });
      await fructose.loadComponent();
    });

    test(
      "renders",
      async () => {
        await expect(element(by.id("play"))).toBeVisible();
        await expect(element(by.id("jump-back"))).toBeVisible();
        await expect(element(by.id("current-time"))).toBeVisible();
        await expect(element(by.id("duration"))).toBeVisible();
        await expect(element(by.id("screen-mode"))).toBeVisible();
      },
      10000
    );

    test(
      "video plays",
      async () => {
        await element(by.id("play")).tap();
        await waitFor(element(by.id("current-time")))
          .toHaveText("00:01")
          .withTimeout(1500);
        await expect(
          element(by.id("current-time").and(by.text("00:00")))
        ).toNotExist();
      },
      20000
    );
  }
);

withComponent(
  <View fructoseID="multiple brightcove players">
    <View testID="player1">
      <BrightcovePlayer
        policyKey={policyKey}
        videoId={videoId}
        accountId={accountId}
      />
    </View>
    <View testID="player2">
      <BrightcovePlayer
        policyKey={policyKey}
        videoId={videoId}
        accountId={accountId}
      />
    </View>
  </View>,
  "multiple brightcove players",
  async fructose => {
    const player1 = id => element(by.id("player1").withDescendant(by.id(id)));
    const player2 = id => element(by.id("player2").withDescendant(by.id(id)));

    beforeEach(async () => {
      await device.launchApp({ newInstance: true });
      await fructose.loadComponent();
    });

    test("renders player1", async () => {
      await expect(player1("play")).toBeVisible();
      await expect(player1("jump-back")).toBeVisible();
      await expect(player1("current-time")).toBeVisible();
      await expect(player1("duration")).toBeVisible();
      await expect(player1("screen-mode")).toBeVisible();
    });

    test("renders player2", async () => {
      await expect(player2("play")).toBeVisible();
      await expect(player2("jump-back")).toBeVisible();
      await expect(player2("current-time")).toBeVisible();
      await expect(player2("duration")).toBeVisible();
      await expect(player2("screen-mode")).toBeVisible();
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
      await device.launchApp({ newInstance: true });
      await fructose.loadComponent();
    });

    test("renders", async () => {
      await expect(element(by.id("external-play"))).toBeVisible();
      await expect(element(by.id("external-pause"))).toBeVisible();
      await expect(element(by.id("external-reset"))).toBeVisible();
      await expect(element(by.id("splash-component"))).toBeVisible();
    });

    test(
      "video plays when external play button is pressed",
      async () => {
        await element(by.id("external-play")).tap();
        await waitFor(element(by.id("current-time")))
          .toHaveText("00:01")
          .withTimeout(5000);
        await expect(
          element(by.id("current-time").and(by.text("00:00")))
        ).toNotExist();
      },
      10000
    );
  }
);
