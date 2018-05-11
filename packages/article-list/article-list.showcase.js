import React from "react";
import articleListWithImagesFixture from "@times-components/provider-test-tools/fixtures/author-profile/article-list-with-images.json";
import StorybookProvider from "@times-components/storybook/storybook-provider";
import storybookReporter from "@times-components/tealium-utils";
import ArticleList from "./src/article-list";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

export default {
  name: "Composed/Article List",
  children: [
    {
      type: "story",
      name: "Default with images",
      component: (_, { decorateAction }) => {
        const props = {
          articles: articleListWithImagesFixture.data.author.articles.list,
          count: articleListWithImagesFixture.data.author.articles.list.length,
          imageRatio: 3 / 2,
          onArticlePress: () => {},
          onTwitterLinkPress: () => {},
          page: 1,
          pageSize: 3,
          refetch: () => {}
        };

        return (
          <ArticleList {...props} />
        );
      }
    }
  ]
};
