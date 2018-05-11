import React from "react";
import articleListWithImagesFixture from "@times-components/provider-test-tools/fixtures/author-profile/article-list-with-images.json";
import ArticleList from "./src/article-list";

export default {
  name: "Composed/Article List",
  children: [
    {
      type: "story",
      name: "Default with images",
      component: () => {
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

        return <ArticleList {...props} />;
      }
    }
  ]
};
