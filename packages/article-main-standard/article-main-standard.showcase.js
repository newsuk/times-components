/* eslint-disable react/prop-types */
/* eslint-env browser */
import React, { Fragment } from "react";
import articleAdConfig from "@times-components/ad/fixtures/article-ad-config.json";
import Context, { defaults } from "@times-components/context";
import { ArticleProvider } from "@times-components/provider";
import {
  article as makeParams,
  MockFixture,
  MockedProvider
} from "@times-components/provider-test-tools";
import { sections } from "@times-components/storybook";
import { scales, themeFactory } from "@times-components/styleguide";
import storybookReporter from "@times-components/tealium-utils";
import {
  ArticleConfigurator,
  makeArticleConfiguration
} from "./showcase-helper";
import Article from "./src/article-main-standard";

const makeArticleUrl = ({ slug, shortIdentifier }) =>
  slug && shortIdentifier
    ? `https://www.thetimes.co.uk/article/${slug}-${shortIdentifier}`
    : "";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const templateName = "mainstandard";

const renderArticle = ({
  adConfig = articleAdConfig,
  analyticsStream,
  decorateAction,
  id,
  scale,
  section
}) => (
  <ArticleProvider debounceTimeMs={0} id={id}>
    {({ article, isLoading, error, refetch }) => (
      <Context.Provider
        value={{
          makeArticleUrl,
          theme: {
            ...themeFactory(section, templateName),
            scale: scale || defaults.theme.scale
          }
        }}
      >
        <Article
          adConfig={adConfig}
          analyticsStream={analyticsStream}
          article={article}
          error={error}
          isLoading={isLoading}
          onAuthorPress={preventDefaultedAction(decorateAction)(
            "onAuthorPress"
          )}
          onCommentGuidelinesPress={preventDefaultedAction(decorateAction)(
            "onCommentGuidelinesPress"
          )}
          onCommentsPress={preventDefaultedAction(decorateAction)(
            "onCommentsPress"
          )}
          onLinkPress={preventDefaultedAction(decorateAction)("onLinkPress")}
          onRelatedArticlePress={preventDefaultedAction(decorateAction)(
            "onRelatedArticlePress"
          )}
          onTopicPress={preventDefaultedAction(decorateAction)("onTopicPress")}
          onTwitterLinkPress={preventDefaultedAction(decorateAction)(
            "onTwitterLinkPress"
          )}
          onVideoPress={preventDefaultedAction(decorateAction)("onVideoPress")}
          refetch={refetch}
        />
      </Context.Provider>
    )}
  </ArticleProvider>
);

const mockArticle = ({
  adConfig = articleAdConfig,
  analyticsStream = storybookReporter,
  decorateAction,
  id,
  params,
  scale,
  sectionColour
}) => (
  <MockFixture
    params={params}
    render={mocks => (
      <MockedProvider mocks={mocks}>
        {renderArticle({
          adConfig,
          analyticsStream,
          decorateAction,
          id,
          scale,
          sectionColour
        })}
      </MockedProvider>
    )}
  />
);

const selectScales = select => select("Scale", scales, scales.medium);
const selectSection = select => sections[select("Section", sections, "News")];

export default {
  children: [
    {
      component: ({ boolean, select }, { decorateAction }) => {
        const id = "198c4b2f-ecec-4f34-be53-c89f83bc1b44";
        const scale = selectScales(select);
        const section = selectSection(select);
        const withFlags = boolean("Flags", true);
        const withHeadline = boolean("Headline", true);
        const withLabel = boolean("Label", true);
        const withLeadAsset = boolean("Lead Asset", true);
        const withLinkedByline = boolean("Linked Byline", true);
        const withStandfirst = boolean("Standfirst", true);
        const withVideo = boolean("Video", true);

        const link = typeof document === "object" &&
          window !== window.top && (
            <a
              href={`/iframe.html${window.top.location.search}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Open in new window
            </a>
          );

        return (
          <Fragment>
            {link}
            {
              <ArticleConfigurator
                configuration={makeArticleConfiguration({
                  withFlags,
                  withHeadline,
                  withLabel,
                  withLeadAsset,
                  withLinkedByline,
                  withStandfirst,
                  withVideo
                })}
                id={id}
              >
                {renderArticle({
                  adConfig: articleAdConfig,
                  analyticsStream: storybookReporter,
                  decorateAction,
                  id,
                  scale,
                  section
                })}
              </ArticleConfigurator>
            }
          </Fragment>
        );
      },
      name: "Main Standard",
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
  name: "Pages/Templates"
};
