/* eslint-disable react/prop-types */
/* eslint-env browser */
import React, { Fragment } from "react";
import invert from "lodash.invert";
import { AdComposer } from "@times-components/ad";
import articleAdConfig from "@times-components/ad/fixtures/article-ad-config.json";
import Context from "@times-components/context";
import LazyLoad from "@times-components/lazy-load";
import { ArticleProvider } from "@times-components/provider";
import {
  article as makeParams,
  MockFixture,
  MockedProvider
} from "@times-components/provider-test-tools";
import { colours, scales, spacing } from "@times-components/styleguide";
import storybookReporter from "@times-components/tealium-utils";
import { makeArticleUrl } from "@times-components/test-utils";
import {
  ArticleConfigurator,
  makeArticleConfiguration
} from "./showcase-helper";
import Article from "./src/article";
import fullArticleFixture, {
  bylineWithLink,
  longContent,
  videoLeadAsset
} from "./fixtures/full-article";

const selectScales = select => select("Scale", scales, scales.medium);
const selectSection = select =>
  select("Section", invert(colours.section), colours.section.default);

const renderComponent = (config, scale, sectionColour) => {
  const data = fullArticleFixture(config);
  return (
    <AdComposer adConfig={articleAdConfig}>
      <LazyLoad rootMargin={spacing(10)} threshold={0.5}>
      {({ observed, registerNode }) => (
        <Context.Provider value={{ makeArticleUrl, theme: { scale, sectionColour } }}>
          <Article
            analyticsStream={storybookReporter}
            data={data}
            observed={observed}
            registerNode={registerNode}
          />
        </Context.Provider>
      )}
    </LazyLoad>
  </AdComposer>
  )
}

export default {
  children: [
    {
      component: ({ boolean, select }, { decorateAction }) => {

        const scale = selectScales(select);
        const sectionColour = selectSection(select);
        const commentsEnabled = boolean("Comments Enabled?", true)
        const relatedArticleSlice = boolean("Related Articles?", true)
        const topics = boolean("Topics?", true)

        const config = {
          commentsEnabled: commentsEnabled ? undefined : false,
          relatedArticleSlice: relatedArticleSlice ? undefined : null,
          topics: topics ? undefined : [],
        };

        return renderComponent(config, scale, sectionColour);
      },
      name: "Default",
      type: "story"
    },
    {
      component: ({ select }, { decorateAction }) => {
        const id = "198c4b2f-ecec-4f34-be53-c89f83bc1b44";
        const scale = selectScales(select);
        const sectionColour = selectSection(select);

        return mockArticle({
          decorateAction,
          id,
          params: makeParams({
            error: () => new Error("Article error"),
            variables: () => ({
              id
            })
          }),
          scale,
          sectionColour
        });
      },
      name: "Error",
      platform: "native",
      type: "story"
    }
  ],
  name: "Composed/Article"
};
