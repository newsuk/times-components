/* eslint-disable react/prop-types */
import React from "react";
import articleAdConfig from "@times-components/ad/fixtures/article-ad-config.json";
import Context, { defaults } from "@times-components/context";
import { ArticleProvider } from "@times-components/provider";
import Responsive from "@times-components/responsive";
import {
  article as makeParams,
  MockFixture,
  MockedProvider
} from "@times-components/provider-test-tools";
import { sections } from "@times-components/storybook";
import { scales, themeFactory } from "@times-components/styleguide";
import storybookReporter from "@times-components/tealium-utils";
import ArticleMainCommment from "./src/article-main-comment";

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

const templateName = "maincomment";

const renderArticle = ({
  adConfig = articleAdConfig,
  analyticsStream,
  decorateAction,
  id,
  scale,
  section
}) => (
  <Responsive>
    <ArticleProvider debounceTimeMs={0} id={id}>
      {({ article, isLoading, error, refetch }) => {
        // When work is completed in TPA, the schema should do this for us
        const data = {
          author: {
            image:
              "https://feeds.thetimes.co.uk/web/imageserver/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0694e84e-04ff-11e7-976a-0b4b9a1a67a3.jpg?crop=854,854,214,0&resize=400"
          },
          ...article,
          template: "maincomment"
        };

        return (
          <Context.Provider
            value={{
              makeArticleUrl,
              theme: {
                ...themeFactory(section, templateName),
                scale: scale || defaults.theme.scale
              }
            }}
          >
            <ArticleMainCommment
              adConfig={adConfig}
              analyticsStream={analyticsStream}
              article={data}
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
              onLinkPress={preventDefaultedAction(decorateAction)(
                "onLinkPress"
              )}
              onRelatedArticlePress={preventDefaultedAction(decorateAction)(
                "onRelatedArticlePress"
              )}
              onTopicPress={preventDefaultedAction(decorateAction)(
                "onTopicPress"
              )}
              onTwitterLinkPress={preventDefaultedAction(decorateAction)(
                "onTwitterLinkPress"
              )}
              onVideoPress={preventDefaultedAction(decorateAction)(
                "onVideoPress"
              )}
              refetch={refetch}
            />
          </Context.Provider>
        );
      }}
    </ArticleProvider>
  </Responsive>
);

const mockArticle = ({
  adConfig = articleAdConfig,
  analyticsStream = storybookReporter,
  decorateAction,
  id,
  params,
  scale,
  section
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
          section
        })}
      </MockedProvider>
    )}
  />
);

const selectScales = select => select("Scale", scales, scales.medium);
const selectSection = select =>
  sections[select("Section", sections, "Comment")];

export default {
  children: [
    {
      component: ({ select }, { decorateAction }) => {
        const id = "198c4b2f-ecec-4f34-be53-c89f83bc1b44";
        const scale = selectScales(select);
        const section = selectSection(select);

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
          section
        });
      },
      name: "Main Comment - Error",
      platform: "native",
      type: "story"
    }
  ],
  name: "Pages/Templates"
};
