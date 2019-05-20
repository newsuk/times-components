/* eslint-disable import/no-extraneous-dependencies, no-bitwise, operator-assignment, react/prop-types */
import React, { Component, Fragment } from "react";
import articleAdConfig from "@times-components/ad/fixtures/article-ad-config.json";
import {
  ContextProviderWithDefaults,
  defaults
} from "@times-components/context";
import { ArticleProvider } from "@times-components/provider";
import {
  article as makeParams,
  fixtures,
  MockedProvider,
  schemaToMocks
} from "@times-components/provider-test-tools";
import { sections } from "@times-components/storybook";
import { scales, themeFactory } from "@times-components/styleguide";
import storybookReporter from "@times-components/tealium-utils";
import { MessageManager } from "@times-components/message-bar";
import Article, { templates } from "./src/article";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const FLAGS = 1;
const HEADLINE = 2;
const KEY_FACTS = 4;
const LABEL = 8;
const LEAD_ASSET = 16;
const LINKED_BYLINE = 32;
const PULL_QUOTE = 64;
const STANDFIRST = 128;
const VIDEO = 256;

export const makeArticleConfiguration = ({
  withFlags,
  withHeadline,
  withKeyFacts,
  withLabel,
  withLeadAsset,
  withLinkedByline,
  withPullQuote,
  withStandfirst,
  withVideo
}) => {
  let mask;

  if (withFlags) {
    mask = mask | FLAGS;
  }

  if (withHeadline) {
    mask = mask | HEADLINE;
  }

  if (withKeyFacts) {
    mask = mask | KEY_FACTS;
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

  if (withPullQuote) {
    mask = mask | PULL_QUOTE;
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
  const extraContent = [];

  if (!(configuration & FLAGS)) {
    configuredArticle.expirableFlags = [];
  }

  if (!(configuration & HEADLINE)) {
    configuredArticle.headline = null;
  }

  if (configuration & KEY_FACTS) {
    configuredArticle.content = [
      ...configuredArticle.content.slice(0, 2),
      fixtures.keyFacts,
      ...configuredArticle.content.slice(2)
    ];
  }

  if (!(configuration & LABEL)) {
    configuredArticle.label = null;
  }

  if (!(configuration & LEAD_ASSET)) {
    configuredArticle.leadAsset = null;
  }

  if (configuration & LINKED_BYLINE) {
    configuredArticle.bylines = fixtures.bylineWithLink;
  }

  if (configuration & PULL_QUOTE) {
    extraContent.push(fixtures.pullQuote);
  }

  if (!(configuration & STANDFIRST)) {
    configuredArticle.standfirst = null;
  }

  if (configuration & VIDEO) {
    extraContent.unshift(fixtures.inlineVideo);
  } else {
    configuredArticle.hasVideo = false;
  }

  configuredArticle.content = [...extraContent, ...configuredArticle.content];
  configuredArticle.paywalledContent = [...configuredArticle.content];

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
    const { configuration, id } = this.props;
    schemaToMocks(
      makeParams({
        makeArticle: makeArticle(configuration),
        variables: () => ({
          id
        })
      })
    ).then(mocks => this.setState({ mocks }));
  }

  componentDidUpdate(prevProps) {
    const { configuration, id } = this.props;
    if (configuration !== prevProps.configuration) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        {
          reRendering: true
        },
        () =>
          schemaToMocks(
            makeParams({
              makeArticle: makeArticle(configuration),
              variables: () => ({
                id
              })
            })
          ).then(mocks => this.setState({ mocks, reRendering: false }))
      );
    }
  }

  render() {
    const { children } = this.props;
    const { mocks, reRendering } = this.state;
    if (!mocks.length || reRendering) {
      return null;
    }

    return <MockedProvider mocks={mocks}>{children}</MockedProvider>;
  }
}

const renderArticle = ({
  adConfig = articleAdConfig,
  analyticsStream,
  decorateAction,
  id,
  inDepthBackgroundColour,
  inDepthTextColour,
  scale,
  section,
  template,
  isTeaser,
  isMeteredExpired
}) => (
  <ArticleProvider debounceTimeMs={0} id={id}>
    {({ article, error, refetch }) => {
      if (!article) {
        return null;
      }

      const data = {
        ...article,
        backgroundColour: inDepthBackgroundColour,
        descriptionMarkup: [article.content.find(m => m.name === "paragraph")],
        template,
        textColour: inDepthTextColour
      };

      return (
        <ContextProviderWithDefaults
          value={{
            theme: {
              ...themeFactory(section, template),
              scale: scale || defaults.theme.scale
            },
            user: {
              isLoggedIn: !isTeaser || isMeteredExpired,
              isMeteredExpired
            }
          }}
        >
          <MessageManager animate delay={30000} scale={scales.medium}>
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
          </MessageManager>
        </ContextProviderWithDefaults>
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
  sections[select("Section", sections, sections.default)];
const selectTemplate = select =>
  select("Template", templateNames, templateNames.mainstandard);

const renderArticleConfig = ({
  boolean,
  decorateAction,
  hasScaling,
  link = null,
  select,
  isTeaser = false,
  isLoggedIn = false,
  isMeteredExpired = false
}) => {
  const id = "263b03a1-2ce6-4b94-b053-0d35316548c5";
  const withFlags = boolean("Flags", true);
  const withHeadline = boolean("Headline", true);
  const withKeyFacts = boolean("Key Facts", false);
  const withLabel = boolean("Label", true);
  const withLeadAsset = boolean("Lead Asset", true);
  const withLinkedByline = boolean("Linked Byline", true);
  const withPullQuote = boolean("Pull Quote", false);
  const withStandfirst = boolean("Standfirst", true);
  const withVideo = boolean("Video", true);
  const withTeaser = !isTeaser && boolean("Teaser (only Web)", false);
  const isMeteredExpiredPage =
    !isMeteredExpired && boolean("Metered expired page (only web)", false);

  const scale = hasScaling ? selectScales(select) : null;
  const section = selectSection(select);
  const template = selectTemplate(select);
  const inDepthBackgroundColour =
    template === "indepth"
      ? { rgba: { alpha: 1, blue: 190, green: 129, red: 60 } }
      : null;
  const inDepthTextColour =
    template === "indepth"
      ? { rgba: { alpha: 1, blue: 255, green: 255, red: 255 } }
      : null;

  /* eslint-disable no-undef */
  window.nuk = window.nuk || {};
  window.nuk.user = { isLoggedIn, isMeteredExpired };
  /* eslint-enable no-undef */

  return (
    <Fragment>
      {link}
      {
        <ArticleConfigurator
          configuration={makeArticleConfiguration({
            withFlags,
            withHeadline,
            withKeyFacts,
            withLabel,
            withLeadAsset,
            withLinkedByline,
            withPullQuote,
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
            inDepthBackgroundColour,
            inDepthTextColour,
            isTeaser: isTeaser || withTeaser,
            isMeteredExpired: isMeteredExpired || isMeteredExpiredPage,
            scale,
            section,
            template
          })}
        </ArticleConfigurator>
      }
    </Fragment>
  );
};

export default renderArticleConfig;
