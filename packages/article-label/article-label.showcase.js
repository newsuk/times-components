/* eslint-disable react/prop-types */
import React from "react";
import invert from "lodash.invert";
import { colours } from "@times-components/styleguide";
import ArticleLabel from "./src/article-label";

export default {
  children: [
    {
      component: ({ select }) => (
        <ArticleLabel
          color={select(
            "Section",
            invert(colours.section),
            colours.section.default
          )}
          title="swimming"
        />
      ),
      name: "Article Label",
      type: "story"
    }
  ],
  name: "Primitives/Article Label"
};
