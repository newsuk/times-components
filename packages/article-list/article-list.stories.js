import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import ArticleList from "./src/article-list";

storiesOf("ArticleList", module).add("ArticleList", () => <ArticleList />);
