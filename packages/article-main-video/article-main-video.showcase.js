/* eslint-disable react/prop-types */
import React from "react";
import articleAdConfig from "@times-components/ad/fixtures/article-ad-config.json";
import { fixtures } from "@times-components/provider-test-tools";
import { NewTab } from "@times-components/storybook";
import storybookReporter from "@times-components/tealium-utils";
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
}) => (
  <Article
    adConfig={adConfig}
    analyticsStream={analyticsStream}
    article={fixtures.articleVideoData}
    isLoading={false}
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
  />
);

export default {
  children: [
    {      
      component: ({ boolean, color, select }, { decorateAction }) =>
        renderArticle({
          boolean,
          color,
          analyticsStream: storybookReporter,
          decorateAction,
          hasScaling: false,
          link: <NewTab />,
          select
        }),
      name: "Video Article",
      platform: "web",
      type: "story"
    }
  ],
  name: "Pages/Article"
};
