/* eslint-disable react/prop-types */
import React from "react";
import { Text, View } from "react-native";
import invert from "lodash.invert";
import articleAdConfig from "@times-components/ad/fixtures/article-ad-config.json";
import Context from "@times-components/context";
import { colours, scales } from "@times-components/styleguide";
import storybookReporter from "@times-components/tealium-utils";
import fullArticleFixture from "./fixtures/full-article";
import ArticleSkeleton from "./src/article-skeleton";

const makeArticleUrl = ({ slug, shortIdentifier }) =>
  slug && shortIdentifier
    ? `https://www.thetimes.co.uk/article/${slug}-${shortIdentifier}`
    : "";

const TestHeader = () => (
  <View
    style={{
      alignItems: "center",
      borderColor: "#66666",
      borderWidth: 1,
      justfyContent: "center",
      margin: 20,
      padding: 20
    }}
  >
    <Text>THIS IS A TEST ARTICLE HEADER</Text>
  </View>
);

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const selectScales = select => select("Scale", scales, scales.medium);
const selectSection = select =>
  select("Section", invert(colours.section), colours.section.default);

const renderArticleSkeleton = ({
  boolean,
  decorateAction,
  hasScaling,
  select
}) => {
  const scale = hasScaling ? selectScales(select) : null;
  const sectionColour = selectSection(select);
  const commentsEnabled = boolean("Comments Enabled?", true);
  const relatedArticleSlice = boolean("Related Articles?", true);
  const topics = boolean("Topics?", true);
  const header = boolean("Header?", false);

  const config = {
    commentsEnabled: commentsEnabled ? undefined : false,
    relatedArticleSlice: relatedArticleSlice ? undefined : null,
    topics: topics ? undefined : []
  };
  const data = fullArticleFixture(config);
  const showHeader = header ? () => <TestHeader /> : () => null;

  return (
    <Context.Provider
      value={{ makeArticleUrl, theme: { scale, sectionColour } }}
    >
      <ArticleSkeleton
        adConfig={articleAdConfig}
        analyticsStream={storybookReporter}
        data={data}
        Header={showHeader}
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
        onViewableItemsChanged={() => null}
      />
    </Context.Provider>
  );
};

export default renderArticleSkeleton;
