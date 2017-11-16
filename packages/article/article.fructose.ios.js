/* globals withComponent device test expect element by beforeEach */

import React from "react";
import Article from "./article";

const fullArticleFixture = require("./fixtures/full-article.json");

const props = {
  ...fullArticleFixture.data,
  analyticsStream: () => {},
  isLoading: false,
  fructoseID: "defaultArticle"
};
withComponent(
  <Article {...props} />,
  "default non interactive article",
  async fructose => {
    beforeEach(async () => {
      await device.launchApp({ newInstance: true });
      await fructose.loadComponent();
    });

    test("default Article should render correctly", async () => {
      await expect(element(by.id("flat-list-article")).atIndex(0)).toBeVisible();
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

    test(
      "default Article should be able to scroll down the page",
      async () => {
        await expect(element(by.id("flat-list-article")).atIndex(0)).toBeVisible();
        await expect(element(by.id("paragraph-3"))).toBeNotVisible();
        await element(by.id("flat-list-article")).atIndex(0).scroll(900, "down");
        await expect(element(by.id("paragraph-3"))).toBeVisible();
      },
      20000
    );
  }
);
