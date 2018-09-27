/* eslint-disable react/prop-types, no-bitwise, operator-assignment */
/* eslint-env browser */
import React, { Component } from "react";
import invert from "lodash.invert";
import Context from "@times-components/context";
import { ArticleProvider } from "@times-components/provider";
import {
  article as makeParams,
  fixtures,
  MockFixture,
  MockedProvider,
  schemaToMocks
} from "@times-components/provider-test-tools";
import StorybookProvider from "@times-components/storybook/storybook-provider";
import { colours, scales } from "@times-components/styleguide";
import storybookReporter from "@times-components/tealium-utils";
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

const FLAGS = 1;
const LABEL = 2;
const LEAD_ASSET = 4;
const LINKED_BYLINE = 8;
const STANDFIRST = 16;
const VIDEO = 32;

const makeArticleConfiguration = ({
  withFlags,
  withLabel,
  withLeadAsset,
  withLinkedByline,
  withStandfirst,
  withVideo
}) => {
  let mask;

  if (withFlags) {
    mask = mask | FLAGS;
  }

  if (withLabel) {
    mask = mask | LABEL;
  }

  if (withLeadAsset) {
    mask = mask | LEAD_ASSET;
  }

  if (withLinkedByline) {
    mask = mask | LINKED_BYLINE;
  }

  if (withStandfirst) {
    mask = mask | STANDFIRST;
  }

  if (withVideo) {
    mask = mask | VIDEO;
  }

  return mask;
};

const makeArticle = configuration => article => {
  const configuredArticle = { ...article };

  if (!(configuration & FLAGS)) {
    configuredArticle.flags = [];
  }

  if (!(configuration & LABEL)) {
    configuredArticle.label = null;
  }

  if (!(configuration & LEAD_ASSET)) {
    configuredArticle.leadAsset = null;
  }

  if (configuration & LINKED_BYLINE) {
    configuredArticle.byline = fixtures.bylineWithLink;
  }

  if (!(configuration & STANDFIRST)) {
    configuredArticle.standfirst = null;
  }

  if (!(configuration & VIDEO)) {
    configuredArticle.hasVideo = false;
  }

  return configuredArticle;
};

class ArticleConfigurator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mocks: [],
      reRendering: false
    };
  }

  componentDidMount() {
    schemaToMocks(
      makeParams({
        makeArticle: makeArticle(this.props.configuration),
        variables: () => ({
          id: this.props.id
        })
      })
    ).then(mocks => this.setState({ mocks }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.configuration !== prevProps.configuration) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        {
          reRendering: true
        },
        () =>
          schemaToMocks(
            makeParams({
              makeArticle: makeArticle(this.props.configuration),
              variables: () => ({
                id: this.props.id
              })
            })
          ).then(mocks => this.setState({ mocks, reRendering: false }))
      );
    }
  }

  render() {
    if (!this.state.mocks.length || this.state.reRendering) {
      return null;
    }

    const { decorateAction, id, scale, sectionColour } = this.props;

    return (
      <MockedProvider mocks={this.state.mocks}>
        {renderArticle({
          adConfig: articleAdConfig,
          analyticsStream: storybookReporter,
          decorateAction,
          id,
          scale,
          sectionColour
        })}
      </MockedProvider>
    );
  }
}

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

        return (
          <div>
            <a
              href={`/iframe.html${window.top.location.search}`}
              rel="noopener noreferrer"
              target="blank"
            >
              Click to render the ads
            </a>
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
                decorateAction={decorateAction}
                id={id}
                scale={scale}
                sectionColour={sectionColour}
              />
            }
          </div>
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
