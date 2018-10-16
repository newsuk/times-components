/* globals withComponent device test expect element by beforeEach */

import React from "react";
import Article from "./src/article";

const fullArticleFixture = require("./fixtures/full-article.js");

const props = {
  ...fullArticleFixture.data,
  analyticsStream: () => {},
  fructoseID: "defaultArticle",
  isLoading: false
};
withComponent(
  <Article {...props} />,
  "default non interactive article",
  async fructose => {
    beforeEach(async () => {
      await device.launchApp({ newInstance: true });
      await fructose.loadComponent();
    });

    test("default Article should render correctly", () => {
      expect(element(by.id("flat-list-article")).atIndex(0)).toBeVisible();
      expect(element(by.id("leadAsset"))).toBeVisible();
      expect(element(by.id("label"))).toBeVisible();
      expect(element(by.id("headline"))).toBeVisible();
      expect(element(by.id("standfirst"))).toBeVisible();
      expect(element(by.id("flag-new"))).toBeVisible();
      expect(element(by.id("flag-exclusive"))).toBeVisible();
      expect(element(by.id("articleByline"))).toBeVisible();
      expect(element(by.id("datePublication"))).toBeVisible();

      expect(element(by.id("flag-updated"))).toNotExist();
      expect(element(by.id("flag-sponsored"))).toNotExist();
    });
  }
);
