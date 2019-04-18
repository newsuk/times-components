/* eslint-disable react/prop-types */
import React from "react";
import { ContextProviderWithDefaults } from "@times-components/context";
import { scales } from "@times-components/styleguide";
import topicsData from "./fixtures/topics";
import renderArticleTopics from "./showcase-helper";

export default {
  children: [
    {
      component: ({ select }, { decorateAction }) => {
        const scale = select("Scale", scales, scales.medium);
        return (
          <ContextProviderWithDefaults value={{ theme: { scale } }}>
            {renderArticleTopics({ data: topicsData, decorateAction })}
          </ContextProviderWithDefaults>
        );
      },
      name: "Group of Topics",
      platform: "native",
      type: "story"
    },
    {
      component: ({ select }, { decorateAction }) => {
        const scale = select("Scale", scales, scales.medium);
        return (
          <ContextProviderWithDefaults value={{ theme: { scale } }}>
            {renderArticleTopics({ data: [topicsData[0]], decorateAction })}
          </ContextProviderWithDefaults>
        );
      },
      name: "Single Topic",
      platform: "native",
      type: "story"
    }
  ],
  name: "Primitives/Article Topics"
};
