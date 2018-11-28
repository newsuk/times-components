/* eslint-disable react/prop-types */
/* eslint-env browser */
import React, { Fragment } from "react";
import invert from "lodash.invert";
import articleAdConfig from "@times-components/ad/fixtures/article-ad-config.json";
import Context from "@times-components/context";
import { ArticleProvider } from "@times-components/provider";
import { colours, scales } from "@times-components/styleguide";
import storybookReporter from "@times-components/tealium-utils";
import {
  ArticleConfigurator,
  makeArticleConfiguration
} from "./showcase-helper";
import Article, { templates } from "./src/article";

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

const renderArticle = ({
  adConfig = articleAdConfig,
  analyticsStream,
  decorateAction,
  id,
  scale,
  sectionColour,
  template
}) => (
  <ArticleProvider debounceTimeMs={0} id={id}>
    {({ article, error, refetch }) => {
      if (!article) {
        return null;
      }

      const data = {
        ...article,
        author: {
          image:
            "https://feeds.thetimes.co.uk/web/imageserver/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0694e84e-04ff-11e7-976a-0b4b9a1a67a3.jpg?crop=854,854,214,0&resize=400"
        },
        template
      };
      return (
        <Context.Provider
          value={{ makeArticleUrl, theme: { scale, sectionColour } }}
        >
          <Article
            adConfig={adConfig}
            analyticsStream={analyticsStream}
            article={data}
            error={error}
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
            refetch={refetch}
          />
        </Context.Provider>
      );
    }}
  </ArticleProvider>
);

const templateNames = Object.keys(templates).reduce(
  (t, key) => ({ ...t, [key]: key }),
  {}
);

const selectScales = select => select("Scale", scales, scales.medium);
const selectSection = select =>
  select("Section", invert(colours.section), colours.section.default);
const selectTemplate = select =>
  select("Template", templateNames, templateNames.mainstandard);

export default {
  children: [
    {
      component: ({ boolean, select }, { decorateAction }) => {
        const id = "263b03a1-2ce6-4b94-b053-0d35316548c5";
        const scale = selectScales(select);
        const sectionColour = selectSection(select);
        const template = selectTemplate(select);
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
                  sectionColour,
                  template
                })}
              </ArticleConfigurator>
            }
          </Fragment>
        );
      },
      name: "Article with template choice",
      type: "story"
    }
  ],
  name: "Pages/Article"
};
