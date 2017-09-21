/* globals withComponent Chromeless test expect beforeEach */
import React from "react";
import AuthorProfile from "./author-profile";
import authorProfileGenerator from "./fixture-generator";

let chromeless;
const setup = () => {
  chromeless = new Chromeless();
};

const examples = authorProfileGenerator(11);

const props = {
  data: Object.assign({}, examples, {
    count: examples.articles.count,
    pageSize: 10,
    page: 1
  }),
  isLoading: false
};

withComponent(
  <AuthorProfile fructoseID="authorProfile" {...props} />,
  "author profile",
  async fructose => {
    beforeEach(setup);
    test(
      "renders and scrolls",
      async () => {
        await chromeless
          .goto("http://localhost:3000")
          .exists("[data-testid='fructose']");

        await fructose.loadComponent();
        await chromeless.exists('[data-testid="author-name"]');

        await chromeless.scrollToElement('[data-testid="articleList-8"]');

        // exists needs to be replaced with .visible currently in chromeless backlog
        // https://github.com/graphcool/chromeless/issues/33
        const result = await chromeless.exists(
          '[data-testid="articleList-10"]'
        );
        expect(result).toBe(true);

        await chromeless.end();
      },
      30000
    );
  }
);
