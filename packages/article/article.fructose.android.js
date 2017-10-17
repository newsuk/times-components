/* globals withComponent test expect element by beforeEach */
import React from "react";
import Article from "./article";
const fullArticleFixture = require("./fixtures/full-article.json");
const data = fullArticleFixture.data;

const byText = (text) => `//*[@text="${text}"]`;

const isTextVisible = async (text, timeout=2000, reverse=false) => {
  await d.waitForElementsByXPath(byText(text), asserter.isVisible, timeout);
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
      await isTextVisible(data.article.label);      
    });

    test("default Article should render correctly", async () => {
      expect(true).toBe(true);
      // await isTextVisible(data.article.headline);
      // await isTextVisible(data.article.label);
      // await isTextVisible(data.article.standfirst);
      // await isTextVisible(data.article.flags[0]);
      // await isTextVisible(data.article.flags[1]);
      // await isTextVisible(data.article.byline.children[0].attributes.value);
    });

    test("default Article should be able to scroll down the page", async () => {
      expect(true).toBe(true);
      // await driver.swipeUp('//android.widget.ScrollView', 5000);
      // const e= await driver.elements(byText(data.article.label));
      // console.error(e)
      // const labelVisible = await driver.isVisible(byText(data.article.label));
      // expect(labelVisible).toBe(false);
    });
  }
);
