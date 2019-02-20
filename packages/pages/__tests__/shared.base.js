import React from "react";
import { scales } from "@times-components/styleguide";
import "./mocks";
import { Article, Section } from "../src/pages";
import getAdTargetingConfig from "../src/article/ad-targeting-config";
import filterInteractives from "../src/article/filter-interactives";

export default makeTest => {
  it("article page", () => {
    expect(
      makeTest(
        <Article
          articleId="test-article-id"
          scale={scales.large}
          sectionName="News"
        />
      )
    ).toMatchSnapshot();
  });

  it("section page", () => {
    expect(
      makeTest(<Section editionId="test-edition-id" sectionTitle="News" />)
    ).toMatchSnapshot();
  });

  it("adConfig is set correctly", () => {
    const article = {
      headline: "This is a headline",
      id: "this-is-a-id",
      keywords: ["this", "is", "a", "headline"]
    };

    const adTargetingConfig = getAdTargetingConfig({
      adTestMode: "testMode",
      article,
      sectionName: "sectionName"
    });

    expect(adTargetingConfig).toMatchSnapshot();
  });

  it("filter interactives from article ast as expected", () => {
    const article = {
      content: [
        { name: "paragraph", value: "dummy value" },
        { name: "paragraph", value: "dummy value" },
        { name: "ad", value: "dummy value" },
        { name: "interactive", value: "dummy value" },
        { name: "paragraph", value: "dummy value" }
      ],
      headline: "This is a headline",
      id: "this-is-a-id"
    };

    const filteredArticle = {
      content: [
        { name: "paragraph", value: "dummy value" },
        { name: "paragraph", value: "dummy value" },
        { name: "ad", value: "dummy value" },
        { name: "paragraph", value: "dummy value" }
      ],
      headline: "This is a headline",
      id: "this-is-a-id"
    };

    expect(filterInteractives(article)).toEqual(filteredArticle);
  });
};
