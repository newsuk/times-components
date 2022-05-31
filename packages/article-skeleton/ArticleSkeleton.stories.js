import React from "react";
import { storiesOf } from "@storybook/react";
import { select, number, boolean } from "@storybook/addon-knobs";
import { decorateAction } from "@storybook/addon-actions";
import { sections } from "@times-components/storybook";
import { HelmetProvider } from "react-helmet-async";
import pick from "lodash.pick";

import { MockBookmarksProvider } from "@times-components/provider-test-tools";
import { ContextProviderWithDefaults } from "@times-components/context";
import storybookReporter from "@times-components/tealium-utils";
import articleAdConfig from "@times-components/ad/fixtures/article-ad-config.json";
import { TrackingContextProvider } from "@times-components/ts-components/dist/helpers/tracking/TrackingContextProvider";
import { colours, scales } from "@times-components/ts-styleguide";
import ArticleSkeleton from "./src/article-skeleton";

import article1 from "./fixtures/samples/article1";
import article2 from "./fixtures/samples/article2";
import article3 from "./fixtures/samples/article3";
import article4 from "./fixtures/samples/article4";
import article5 from "./fixtures/samples/article5";
import article6 from "./fixtures/samples/article6";

const articles = [
  article1,
  article2,
  article3,
  article4,
  article5,
  article6
].map(article => article.data.article);

const articleHeadlines = articles.reduce(
  (result, { shortHeadline }, index) => ({ ...result, [shortHeadline]: index }),
  {}
);

let commentingConfig = {
  account: {
    current: process.env.STORYBOOK_COMMENTING_CURRENT_ID || "sp_rLv5PqMc",
    readOnly: process.env.STORYBOOK_COMMENTING_READONLY_ID || "sp_pCQgrRiN"
  },
  switchOver:
    process.env.STORYBOOK_COMMENTING_SWITCHOVER || "2020-08-10T16:00:00.000Z"
};

const preventDefaultedAction = action =>
  action([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

storiesOf("Composed/Article Skeleton", module)
  .addDecorator(storyFn => (
    <HelmetProvider context={{}}>
      <TrackingContextProvider
        analyticsStream={storybookReporter}
        context={{
          component: "ArticleSkeleton",
          attrs: {
            article_name: "Headline",
            section_details: "Section"
          }
        }}
      >
        {storyFn()}
      </TrackingContextProvider>
    </HelmetProvider>
  ))

  .add("Article Selection", () => {
    const scale = scales.medium;
    const sectionColour = select(
      "Section",
      pick(colours.section, sections),
      colours.section.default,
      "User State"
    );

    const endpoint = {
      endpoint: "https://olympics-embed-staging.pamedia.io",
      authToken: "6i3DuEwbVhr2Fht6",
      gamesCode: "OG2020-TR2"
    };

    const commentSwitchover = boolean(
      "Comment Switchover?",
      false,
      "User State"
    );

    commentingConfig = {
      ...commentingConfig,
      switchOver: commentSwitchover
        ? "2020-08-10T16:00:00.000Z"
        : "2022-08-10T16:00:00.000Z"
    };

    const article = select("Article", articleHeadlines, 0, "User State");
    const data = articles[article];

    const afterParagraph = number(
      "insert after paragraph",
      7,
      {
        min: 0,
        max: 15
      },
      "User State"
    );

    const paragraphPadding = number(
      "paragraph padding",
      2,
      {
        min: 0,
        max: 3
      },
      "User State"
    );
    const inlineRelatedArticleOptions = { afterParagraph, paragraphPadding };

    return (
      <MockBookmarksProvider otherMocks={[]} delay={1000} articleId={data.id}>
        <ContextProviderWithDefaults
          value={{ theme: { scale, sectionColour } }}
        >
          <ArticleSkeleton
            adConfig={articleAdConfig}
            commentingConfig={commentingConfig}
            analyticsStream={storybookReporter}
            data={data}
            isPreview={false}
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
            onTopicPress={preventDefaultedAction(decorateAction)(
              "onTopicPress"
            )}
            onTwitterLinkPress={preventDefaultedAction(decorateAction)(
              "onTwitterLinkPress"
            )}
            onVideoPress={preventDefaultedAction(decorateAction)(
              "onVideoPress"
            )}
            onViewableItemsChanged={() => null}
            olympicsKeys={endpoint}
            inlineRelatedArticleOptions={inlineRelatedArticleOptions}
            navigationMode={{
              isCurrentEdition: false,
              isPastSixDays: false,
              isMyArticles: false,
              isStateless: true
            }}
          />
        </ContextProviderWithDefaults>
      </MockBookmarksProvider>
    );
  });
