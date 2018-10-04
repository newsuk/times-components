/* eslint-disable react/prop-types */
/* eslint-env browser */
import React, { Fragment } from "react";
import invert from "lodash.invert";
import Context from "@times-components/context";
import { ArticleProvider } from "@times-components/provider";
import {
  article as makeParams,
  fixtures,
  MockFixture,
  MockedProvider
} from "@times-components/provider-test-tools";
import StorybookProvider from "@times-components/storybook/storybook-provider";
import { colours, scales } from "@times-components/styleguide";
import storybookReporter from "@times-components/tealium-utils";
import {
  ArticleConfigurator,
  makeArticleConfiguration
} from "./showcase-helper";
import Article from "./src/article";
import articleAdConfig from "./fixtures/article-ad-config.json";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const renderArticle = ({
  adConfig,
  analyticsStream,
  decorateAction,
  id,
  scale,
  sectionColour
}) => (
  <ArticleProvider debounceTimeMs={0} id={id}>
    {({ article, isLoading, error, refetch }) => (
      <Context.Provider value={{ theme: { scale, sectionColour } }}>
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
const selectSection = select =>
  select("Section", invert(colours.section), colours.section.default);

export default {
  name: "Pages/Article",
  children: [
    {
      type: "story",
      name: "Default",
      component: ({ boolean, select }, { decorateAction }) => {
        const id = "198c4b2f-ecec-4f34-be53-c89f83bc1b44";
        const scale = selectScales(select);
        const sectionColour = selectSection(select);
        const withFlags = boolean("Flags", true);
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
                  sectionColour
                })}
              </ArticleConfigurator>
            }
          </Fragment>
        );
      }
    },
    {
      type: "story",
      name: "Article with video asset",
      component: ({ select }, { decorateAction }) => {
        const id = "198c4b2f-ecec-4f34-be53-c89f83bc1b44";
        const scale = selectScales(select);
        const sectionColour = selectSection(select);

        return mockArticle({
          decorateAction,
          id,
          params: makeParams({
            chooseMedia: mediaIndex => {
              if (mediaIndex === 0) {
                return {
                  __typename: "Video"
                };
              }

              return {
                __typename: "Image"
              };
            },
            makeArticle: a => ({
              ...a,
              leadAsset: fixtures.video
            }),
            variables: () => ({
              id
            })
          }),
          scale,
          sectionColour
        });
      }
    },
    {
      type: "story",
      name: "Long Article",
      component: ({ select }, { decorateAction }) => {
        const id = "198c4b2f-ecec-4f34-be53-c89f83bc1b44";
        const scale = selectScales(select);
        const sectionColour = selectSection(select);

        return mockArticle({
          decorateAction,
          id,
          params: makeParams({
            makeArticle: article => ({
              ...article,
              content: [...article.content, ...article.content]
            }),
            variables: () => ({
              id
            })
          }),
          scale,
          sectionColour
        });
      }
    },
    {
      type: "story",
      name: "Loading",
      component: () => (
        <Article
          adConfig={articleAdConfig}
          analyticsStream={storybookReporter}
          isLoading
          onRelatedArticlePress={() => {}}
          onTopicPress={() => {}}
        />
      )
    },
    {
      type: "story",
      name: "Error",
      platform: "native",
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
      }
    },
    {
      type: "story",
      name: "With Provider",
      component: ({ select, text }, { decorateAction }) => {
        const id = text("Article id", "");
        const scale = selectScales(select);
        const sectionColour = selectSection(select);

        return (
          <StorybookProvider>
            {renderArticle({
              adConfig: articleAdConfig,
              analyticsStream: storybookReporter,
              decorateAction,
              id,
              scale,
              sectionColour
            })}
          </StorybookProvider>
        );
      }
    }
  ]
};
