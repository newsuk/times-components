/* eslint-disable react/prop-types */
import React from "react";
import { Article, AuthorProfile, Topic } from "./src/pages";

export default {
  children: [
    {
      component: ({ text }) => {
        const articleId = text(
          "Article id",
          "4938a3d4-8109-11e8-a645-f0478472c67b"
        );

        return <Article articleId={articleId} />;
      },
      name: "Article",
      type: "story"
    },
    {
      component: ({ text }) => {
        const authorSlug = text("Author slug", "deborah-haynes");

        return <AuthorProfile authorSlug={authorSlug} />;
      },
      name: "AuthorProfile",
      type: "story"
    },
    {
      component: ({ text }) => {
        const topicSlug = text("Topic slug", "brexit");

        return <Topic topicSlug={topicSlug} />;
      },
      name: "Topic",
      type: "story"
    }
  ],
  name: "Pages/Pages"
};
