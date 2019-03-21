/* eslint-disable react/prop-types */
import React from "react";
import { ActivityIndicator, Text } from "react-native";
import { sections } from "@times-components/storybook";
import { EditionProvider } from "@times-components/provider";
import { Article, AuthorProfile, Topic } from "./src/pages";
import Section from "./src/section/section";
import withNativeProvider from "./src/with-native-provider";

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
        const sectionTitle = sections[select("Section", sections, "News")];

        return withNativeProvider(
          <EditionProvider debounceTimeMs={0} id={editionId}>
            {({ edition, error, isLoading }) => {
              if (isLoading) {
                return <ActivityIndicator size="large" />;
              }
              if (error) {
                return <Text>{JSON.stringify(error)}</Text>;
              }
              const { publicationName: pubName } = edition;
              return edition.sections
                .filter(({ title }) => title === sectionTitle)
                .map(sectionData => (
                  <Section publicationName={pubName} section={sectionData} />
                ));
            }}
          </EditionProvider>
        );
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
