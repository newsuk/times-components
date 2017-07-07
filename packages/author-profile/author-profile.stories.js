import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import AuthorProfile from "./author-profile";
import example from "./example.json";

storiesOf("AuthorProfile", module).add("AuthorProfile", () =>
  <AuthorProfile
    name={example.name}
    jobTitle={example.jobTitle}
    biography={example.biography}
    image={example.image}
    twitter={example.twitter}
    articleCount={example.articles.count}
    currentPageOfArticles={example.articles.list}
    currentPageOffset={0}
    pageSize={10}
  />
);
