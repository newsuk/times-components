/* eslint-disable react/prop-types */
/* eslint-env browser */
import React from "react";
import { addTypenameToDocument } from "apollo-utilities";
import Context, { scales } from "@times-components/context";
import { ArticleProvider } from "@times-components/provider";
import { article as articleQuery } from "@times-components/provider-queries";
import StorybookProvider from "@times-components/storybook/storybook-provider";
import storybookReporter from "@times-components/tealium-utils";
import Article from "./src/article";
import fullArticleFixture, {
  bylineWithLink,
  longContent,
  videoLeadAsset
} from "./fixtures/full-article";
import articleAdConfig from "./fixtures/article-ad-config.json";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const mocks = [
  {
    request: {
      query: addTypenameToDocument(articleQuery),
      variables: {
        id: "198c4b2f-ecec-4f34-be53-c89f83bc1b44"
      }
    },
    result: {
      data: {
        article: fullArticleFixture()
      }
    }
  }
];

const renderArticle = (
  decorateAction,
  scale,
  {
    fixture,
    isLoading = false,
    analyticsStream = storybookReporter,
    adConfig = articleAdConfig,
    error
  }
) => (
  <Context.Provider value={{ theme: { scale } }}>
    <Article
      adConfig={adConfig}
      analyticsStream={analyticsStream}
      article={fixture}
      error={error}
      isLoading={isLoading}
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
      onVideoPress={preventDefaultedAction(decorateAction)("onVideoPress")}
    />
  </Context.Provider>
);

const selectScales = select => select("Scale", scales, scales.medium);

export default {
  name: "Pages/Article",
  children: [
    {
      type: "story",
      name: "Default",
      component: ({ select }, { decorateAction }) => {
        const scale = selectScales(select);
        return renderArticle(decorateAction, scale, {
          fixture: fullArticleFixture()
        });
      }
    },
    {
      type: "story",
      name: "Article with video asset",
      component: ({ select }, { decorateAction }) => {
        const scale = selectScales(select);
        return renderArticle(decorateAction, scale, {
          fixture: fullArticleFixture({
            leadAsset: videoLeadAsset()
          })
        });
      }
    },
    {
      type: "story",
      name: "Long Article",
      component: ({ select }, { decorateAction }) => {
        const scale = selectScales(select);
        return renderArticle(decorateAction, scale, {
          fixture: fullArticleFixture({ content: longContent })
        });
      }
    },
    {
      type: "story",
      name: "Loading",
      component: ({ select }, { decorateAction }) => {
        const scale = selectScales(select);
        return renderArticle(decorateAction, scale, { isLoading: true });
      }
    },
    {
      type: "story",
      name: "Error",
      component: ({ select }, { decorateAction }) => {
        const scale = selectScales(select);
        return renderArticle(decorateAction, scale, {
          error: { message: "An example error." }
        });
      }
    },
    {
      type: "story",
      name: "With Provider",
      component: ({ select, text }, { decorateAction }) => {
        const scale = selectScales(select);
        const predefinedArticles = {
          "198c4b2f-ecec-4f34-be53-c89f83bc1b44": "Default article",
          "1a576df6-cb50-11e4-81dd-064fe933cd41":
            "Video lead asset (requires GraphQL with CI data)"
        };
        const predefinedArticle = select(
          "Predefined article",
          predefinedArticles,
          "198c4b2f-ecec-4f34-be53-c89f83bc1b44"
        );
        const overrideArticleId = text("Override article id", "");

        return (
          <StorybookProvider mocks={mocks}>
            <ArticleProvider
              debounceTimeMs={0}
              id={overrideArticleId || predefinedArticle}
            >
              {({ article, isLoading, error }) => (
                <Context.Provider value={{ theme: { scale } }}>
                  <Article
                    adConfig={articleAdConfig}
                    analyticsStream={storybookReporter}
                    article={article}
                    error={error}
                    isLoading={isLoading}
                    onAuthorPress={preventDefaultedAction(decorateAction)(
                      "onAuthorPress"
                    )}
                    onCommentGuidelinesPress={preventDefaultedAction(
                      decorateAction
                    )("onCommentGuidelinesPress")}
                    onCommentsPress={preventDefaultedAction(decorateAction)(
                      "onCommentsPress"
                    )}
                    onLinkPress={preventDefaultedAction(decorateAction)(
                      "onLinkPress"
                    )}
                    onRelatedArticlePress={preventDefaultedAction(
                      decorateAction
                    )("onRelatedArticlePress")}
                    onTopicPress={preventDefaultedAction(decorateAction)(
                      "onTopicPress"
                    )}
                    onVideoPress={preventDefaultedAction(decorateAction)(
                      "onVideoPress"
                    )}
                  />
                </Context.Provider>
              )}
            </ArticleProvider>
          </StorybookProvider>
        );
      }
    },
    {
      type: "story",
      name: "Fixtures - Full",
      platform: "web",
      component: ({ select }, { decorateAction }) => {
        const scale = selectScales(select);
        return (
          <div>
            <a
              href={`/iframe.html${window.top.location.search}`}
              rel="noopener noreferrer"
              target="blank"
            >
              Click to render the ads
            </a>
            {renderArticle(decorateAction, scale, {
              fixture: fullArticleFixture()
            })}
          </div>
        );
      }
    },
    {
      type: "story",
      name: "Fixtures - Full",
      platform: "native",
      component: ({ select }, { decorateAction }) => {
        const scale = selectScales(select);
        return renderArticle(decorateAction, scale, {
          fixture: fullArticleFixture()
        });
      }
    },
    {
      type: "story",
      name: "Fixtures - Byline with author profile",
      component: ({ select }, { decorateAction }) => {
        const scale = selectScales(select);
        return renderArticle(decorateAction, scale, {
          fixture: fullArticleFixture({ byline: bylineWithLink })
        });
      }
    },
    {
      type: "story",
      name: "Fixtures - No ads",
      component: ({ select }, { decorateAction }) => {
        const scale = selectScales(select);
        return renderArticle(decorateAction, scale, {
          fixture: fullArticleFixture({ withAds: false })
        });
      }
    },
    {
      type: "story",
      name: "Fixtures - No standfirst",
      component: ({ select }, { decorateAction }) => {
        const scale = selectScales(select);
        return renderArticle(decorateAction, scale, {
          fixture: fullArticleFixture({ standfirst: null })
        });
      }
    },
    {
      type: "story",
      name: "Fixtures - No label",
      component: ({ select }, { decorateAction }) => {
        const scale = selectScales(select);
        return renderArticle(decorateAction, scale, {
          fixture: fullArticleFixture({ label: null })
        });
      }
    },
    {
      type: "story",
      name: "Fixtures - No flags",
      component: ({ select }, { decorateAction }) => {
        const scale = selectScales(select);
        return renderArticle(decorateAction, scale, {
          fixture: fullArticleFixture({ flags: null })
        });
      }
    },
    {
      type: "story",
      name: "Fixtures - No standfirst, no label",
      component: ({ select }, { decorateAction }) => {
        const scale = selectScales(select);
        return renderArticle(decorateAction, scale, {
          fixture: fullArticleFixture({ label: null, standfirst: null })
        });
      }
    },
    {
      type: "story",
      name: "Fixtures - No standfirst, no flags",
      component: ({ select }, { decorateAction }) => {
        const scale = selectScales(select);
        return renderArticle(decorateAction, scale, {
          fixture: fullArticleFixture({ flags: null, standfirst: null })
        });
      }
    },
    {
      type: "story",
      name: "Fixtures - No label, no flags",
      component: ({ select }, { decorateAction }) => {
        const scale = selectScales(select);
        return renderArticle(decorateAction, scale, {
          fixture: fullArticleFixture({ flags: null, label: null })
        });
      }
    },
    {
      type: "story",
      name: "Fixtures - No label, no flags, no standfirst",
      component: ({ select }, { decorateAction }) => {
        const scale = selectScales(select);
        return renderArticle(decorateAction, scale, {
          fixture: fullArticleFixture({
            flags: null,
            label: null,
            standfirst: null
          })
        });
      }
    },
    {
      type: "story",
      name: "Fixtures - No lead asset",
      component: ({ select }, { decorateAction }) => {
        const scale = selectScales(select);
        return renderArticle(decorateAction, scale, {
          fixture: fullArticleFixture({ leadAsset: null })
        });
      }
    }
  ]
};
