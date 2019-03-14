import React from "react";
import {
  ArticleFlags,
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag
} from "./src/article-flag";

export default {
  children: [
    {
      component: () => <NewArticleFlag />,
      name: "Article Flag (New)",
      type: "story"
    },
    {
      component: () => <UpdatedArticleFlag />,
      name: "Article Flag (Updated)",
      type: "story"
    },
    {
      component: () => <ExclusiveArticleFlag />,
      name: "Article Flag (Exclusive)",
      type: "story"
    },
    {
      component: () => <SponsoredArticleFlag />,
      name: "Article Flag (Sponsored)",
      type: "story"
    },
    {
      component: () => <NewArticleFlag color="blue" />,
      name: "Article Flag with text colour",
      type: "story"
    },
    {
      component: () => (
        <ArticleFlags
          flags={[
            { expiryTime: "2020-03-13T12:00:00.000Z", type: "UPDATED" },
            { expiryTime: "2019-03-14T12:00:00.000Z", type: "EXCLUSIVE" }
          ]}
        />
      ),
      name: "Article Flags",
      type: "story"
    }
  ],
  name: "Primitives/Article Flag"
};
