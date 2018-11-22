/* globals withComponent test beforeEach driver */
import React from "react";
import ArticleSkeleton from "./src/article-skeleton";

const fullArticleFixture = require("./fixtures/full-article.js");

const isComponentDisplayed = async (id, timeout = 2000) => {
  await driver.waitForElementByAccessibilityId(id, timeout);
};

const props = {
  ...fullArticleFixture.data,
  fructoseID: "articleSkeleton",
  isLoading: false
};
withComponent(
  <ArticleSkeleton {...props} />,
  "article skeleton",
  async fructose => {
    beforeEach(async () => {
      await driver.resetApp();
      await global.driver.waitForElementsByXPath(
        '//*[@text="Fructose"]',
        global.asserter.isVisible,
        10000
      );
      await fructose.loadComponent();
      await isComponentDisplayed("listView");
    });

    test("article skeleton should render correctly", async () => {
      await isComponentDisplayed("leadAsset");
      await isComponentDisplayed("label");
      await isComponentDisplayed("headline");
      await isComponentDisplayed("standfirst");
      await isComponentDisplayed("flag-new");
      await isComponentDisplayed("flag-exclusive");
      await isComponentDisplayed("articleByline");
    });

    test("article skeleton should be able to scroll down the page", async () => {
      await driver.flick(0, -900);
      await driver.waitForElementByXPath(
        `//*[contains(@content-desc, 'paragraph')]`
      );
    });
  }
);
