/* eslint-disable react/prop-types */

import "react-native";
import React from "react";
import invert from "lodash.invert";
import { colours } from "@times-components/styleguide";
import ArticleLabel from "./src/article-label";

export default {
  name: "Primitives/ArticleLabel",
  children: [
    {
      type: "story",
      name: "Article Label",
      component: ({ select }) => (
        <ArticleLabel
          title="swimming"
          color={select(
            "Section",
            invert(colours.section),
            colours.section.default
          )}
        />
      )
    }
  ]
};
