/* eslint-disable react/prop-types */
/* eslint-env browser */
import React from "react";
import invert from "lodash.invert";
import articleAdConfig from "@times-components/ad/fixtures/article-ad-config.json";
import Context from "@times-components/context";
import { colours, scales } from "@times-components/styleguide";
import storybookReporter from "@times-components/tealium-utils";
import Article, { templates } from "./src/article";
import fullArticleFixture from "./fixtures/full-article";

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

const selectScales = select => select("Scale", scales, scales.medium);
const selectSection = select =>
  select("Section", invert(colours.section), colours.section.default);
const selectTemplate = select =>
  select("Template", templates, templates.mainstandard);

const renderComponent = (decorateAction, scale, sectionColour, template) => {
  const data = fullArticleFixture({ template });

  return (
    <Context.Provider
      value={{ makeArticleUrl, theme: { scale, sectionColour } }}
    >
      <Article
        adConfig={articleAdConfig}
        analyticsStream={storybookReporter}
        article={data}
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

export default {
  children: [
    {
      component: ({ select }, { decorateAction }) => {
        const scale = selectScales(select);
        const sectionColour = selectSection(select);
        const template = selectTemplate(select);

        return renderComponent(decorateAction, scale, sectionColour, template);
      },
      name: "Article with Template",
      type: "story"
    }
  ],
  name: "Pages/Article"
};
