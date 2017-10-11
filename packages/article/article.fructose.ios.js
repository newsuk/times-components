/* globals withComponent device  afterEach test expect element by beforeEach waitFor */

import React from "react";
import Article from "./article";

const fullArticleFixture = require("./fixtures/full-article.json");

withComponent(
  <Article fructoseID="defaultArticle" {...fullArticleFixture} />,
  "default non interactive article",
  async fructose => {
    beforeEach(async () => {
      await fructose.loadComponent();
      await waitFor(element(by.id("listView")));
    });

    afterEach(async () => {
      await device.reloadReactNative();
    });

    test("default Article should render correctly", async () => {
      await expect(element(by.id("leadAsset"))).toBeVisible();
      await expect(element(by.id("label"))).toBeVisible();
      await expect(element(by.id("headline"))).toBeVisible();
      await expect(element(by.id("standfirst"))).toBeVisible();
      await expect(element(by.id("flag-new"))).toBeVisible();
      await expect(element(by.id("flag-exclusive"))).toBeVisible();
      await expect(element(by.id("articleByline"))).toBeVisible();
      await expect(element(by.id("datePublication"))).toBeVisible();

      await expect(element(by.id("flag-updated"))).toNotExist();
      await expect(element(by.id("flag-sponsored"))).toNotExist();
    });

    test("default Article should be able to scroll down the page", async () => {
      await expect(element(by.id("paragraph-3"))).toBeNotVisible();
      await element(by.id("listView")).scroll(900, "down");
      await expect(element(by.id("paragraph-3"))).toBeVisible();
    });
  }
);
