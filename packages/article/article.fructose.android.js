/* globals withComponent test expect element by beforeEach */
import React from "react";
import Article from "./article";
const fullArticleFixture = require("./fixtures/full-article.json");
const data = fullArticleFixture.data;

const isComponentDisplayed = async (id, timeout=2000) => {
  await d.waitForElementByAccessibilityId(id, timeout);
}

const props = {
  ...data,
  isLoading: false,
  fructoseID: "defaultArticle"
};
withComponent(
  <Article {...props} />,
  "default non interactive article",
  async fructose => {
    beforeEach(async () => {
      await fructose.loadComponent();
      await isComponentDisplayed('listView');      
    });

    test("default Article should render correctly", async () => {
      await isComponentDisplayed('leadAsset');
      await isComponentDisplayed('label');
      //await isComponentDisplayed('headline');
      await isComponentDisplayed('standfirst');
      await isComponentDisplayed('flag-new');
      await isComponentDisplayed('flag-exclusive');
      await isComponentDisplayed('articleByline');
    });

    test("default Article should be able to scroll down the page", async () => {
      await d.flick(0, -900);
      await d.waitForElementByXPath(`//*[contains(@content-desc, 'paragraph')]`);
    });
  }
);
