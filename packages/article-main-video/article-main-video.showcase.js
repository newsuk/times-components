/* eslint-disable react/prop-types */
import React from "react";
import articleAdConfig from "@times-components/ad/fixtures/article-ad-config.json";
import { fixtures } from "@times-components/provider-test-tools";
import { NewTab } from "@times-components/storybook";
import storybookReporter from "@times-components/tealium-utils";
import { addUserStateKnobs } from "@times-components/user-state";
import Article from "./src/article-main-video";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const renderArticle = ({
  adConfig = articleAdConfig,
  analyticsStream,
  decorateAction,
  articleData,
  articleUpNextData,
  select
}) => {
  const userStatesOptions = [
    "sport",
    "edition",
    "culture",
    "business-money",
    "life-style"
  ];

  const category = select("Article category", userStatesOptions, "life-style");
  const upNextArticles = select("Number of upNext articles", [1, 2, 3, 4], 4);

  return (
    <Article
      adConfig={adConfig}
      analyticsStream={analyticsStream}
      article={{
        ...articleData,
        categoryPath: `/${category}/${articleData.categoryPath}`,
        upNext: articleUpNextData.slice(4 - upNextArticles)
      }}
      isLoading={false}
      onAuthorPress={preventDefaultedAction(decorateAction)("onAuthorPress")}
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
    />
  );
};

const upNextArr = fixtures.articleVideoData.upNext;

export default {
  children: [
    {
      component: ({ boolean, color, select }, { decorateAction }) => {
        addUserStateKnobs();
        return renderArticle({
          boolean,
          color,
          analyticsStream: storybookReporter,
          decorateAction,
          articleData: fixtures.articleVideoData,
          articleUpNextData: upNextArr,
          hasScaling: false,
          link: <NewTab />,
          select
        });
      },
      name: "Video Article",
      platform: "web",
      type: "story"
    }
  ],
  name: "Pages/Article"
};
