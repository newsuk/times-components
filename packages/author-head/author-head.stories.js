import React from "react";
import { storiesOf } from "@storybook/react-native";
import AuthorHead from "./author-head";

const data = {
  uri: "https://pbs.twimg.com/profile_images/706844157093027840/2Aan_aSU.jpg",
  name: "Mr. Cat von Kitten",
  title: "Business Cat",
  twitter: "@bcatcomic",
  bio:
    "Get the book, Business Cat: Money Power Treats, here: http://buff.ly/2dqX7ZB."
};

storiesOf("AuthorHead", module).add("Full Header", () =>
  <AuthorHead {...data} />
);
