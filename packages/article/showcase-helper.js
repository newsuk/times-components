/* eslint-disable import/no-extraneous-dependencies, no-bitwise, operator-assignment, react/prop-types */
import React, { Component, Fragment } from "react";
import articleAdConfig from "@times-components/ad/fixtures/article-ad-config.json";
import Context, { defaults } from "@times-components/context";
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

const FLAGS = 1;
const HEADLINE = 2;
const LABEL = 4;
const LEAD_ASSET = 8;
const LINKED_BYLINE = 16;
const STANDFIRST = 32;
const VIDEO = 64;

export const makeArticleConfiguration = ({
  withFlags,
  withHeadline,
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

  if (withHeadline) {
    mask = mask | HEADLINE;
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

  if (!(configuration & HEADLINE)) {
    configuredArticle.headline = null;
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
        backgroundColour: inDepthBackgroundColour,
        template,
        textColour: inDepthTextColour
      };
      return (
        <Context.Provider
          value={{
            makeArticleUrl,
            theme: {
              ...themeFactory(section, template),
              scale: scale || defaults.theme.scale
            }
          }}
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
  sections[select("Section", sections, sections.default)];
const selectTemplate = select =>
  select("Template", templateNames, templateNames.mainstandard);

const renderArticleConfig = ({
  boolean,
  color,
  decorateAction,
  hasScaling,
  link = null,
  select
}) => {
  const id = "263b03a1-2ce6-4b94-b053-0d35316548c5";
  const withFlags = boolean("Flags", true);
  const withHeadline = boolean("Headline", true);
  const withLabel = boolean("Label", true);
  const withLeadAsset = boolean("Lead Asset", true);
  const withLinkedByline = boolean("Linked Byline", true);
  const withStandfirst = boolean("Standfirst", true);
  const withVideo = boolean("Video", true);

  const scale = hasScaling ? selectScales(select) : null;
  const section = selectSection(select);
  const template = selectTemplate(select);
  const inDepthBackgroundColour =
    template === "indepth"
      ? color("In Depth Background Colour: ", "#3C81BE")
      : null;
  const inDepthTextColour =
    template === "indepth" ? color("In Depth Text Colour: ", "#FFFFFF") : null;

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
            inDepthBackgroundColour,
            inDepthTextColour,
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
