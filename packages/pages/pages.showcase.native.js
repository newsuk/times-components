/* eslint-disable react/prop-types */
import React from "react";
import { sections } from "@times-components/storybook";
import { Article, AuthorProfile, Section, Topic } from "./src/pages";

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
      component: ({ select, text }) => {
        const editionId = text(
          "Edition id",
          "2b6e462c-225f-11e9-b782-40e94f317da5"
        );
        const section = sections[select("Section", sections, "News")];

        return <Section editionId={editionId} section={section} />;
      },
      name: "Section",
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
