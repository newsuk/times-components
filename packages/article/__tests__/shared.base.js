/* eslint-disable react/no-multi-comp */

import React, { Component } from "react";
import PropTypes from "prop-types";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import Article from "../src/article";
import articleFixture, {
  testFixture,
  videoLeadAsset
} from "../fixtures/full-article";
import { adConfig } from "./ad-mock";

const findComponents = (testInstance, componentName) =>
  testInstance.root.findAll(node => {
    if (typeof node.type === "string") {
      return node.type.includes(componentName);
    }

    return false;
  });

const emptyArticle = {
  byline: null,
  flags: null,
  label: null,
  leadAsset: null,
  relatedArticles: null,
  relatedArticlesLayout: null,
  standfirst: null,
  topics: null
};

export const snapshotTests = renderComponent => [
  {
    name: "an error",
    test() {
      const props = {
        error: { message: "An example error." }
      };

      const output = renderComponent(
        <Article
          {...props}
          adConfig={adConfig}
          analyticsStream={() => {}}
          onAuthorPress={() => {}}
          onLinkPress={() => {}}
          onRelatedArticlePress={() => {}}
          onTopicPress={() => {}}
          onVideoPress={() => {}}
        />
      );

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "a full article with an image as the lead asset",
    test() {
      const article = articleFixture({
        ...testFixture,
        content: [
          {
            name: "image",
            attributes: {
              display: "primary",
              ratio: "1500:1000",
              url: "https://image.io",
              caption: "An image caption",
              credits: "The image credits"
            },
            children: []
          },
          {
            name: "link",
            attributes: {
              href: "https://link.io",
              target: "_blank"
            },
            children: [
              {
                name: "text",
                attributes: {
                  value: "Some Link"
                },
                children: []
              }
            ]
          },
          {
            name: "paragraph",
            attributes: {},
            children: [
              {
                name: "text",
                attributes: {
                  value: "Some content"
                },
                children: []
              }
            ]
          },
          {
            name: "pullQuote",
            attributes: {
              content: "A pull quote",
              caption: {
                name: "AName",
                twitter: "@AName"
              }
            },
            children: []
          },
          {
            name: "video",
            attributes: {
              display: "primary",
              posterImageId: "0c0309d4-1aeb-11e8-9010-1eef6ba5d3de",
              brightcoveVideoId: "4084164751001",
              brightcovePolicyKey: "1.2.3.4",
              brightcoveAccountId: "57838016001",
              paidOnly: "false",
              caption: "This is video caption",
              posterImageUrl: "https://image.io"
            },
            children: []
          }
        ]
      });

      const output = renderComponent(
        <Article
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={article}
          onAuthorPress={() => {}}
          onLinkPress={() => {}}
          onRelatedArticlePress={() => {}}
          onTopicPress={() => {}}
          onVideoPress={() => {}}
        />
      );

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "an article with a video as the lead asset",
    test() {
      const output = renderComponent(
        <Article
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({
            ...testFixture,
            ...emptyArticle,
            leadAsset: videoLeadAsset({
              brightcovePolicyKey: "1.2.3.4",
              url: "https://video.io"
            })
          })}
          onAuthorPress={() => {}}
          onLinkPress={() => {}}
          onRelatedArticlePress={() => {}}
          onTopicPress={() => {}}
          onVideoPress={() => {}}
        />
      );

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "an article with no lead asset",
    test() {
      const output = renderComponent(
        <Article
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({
            ...testFixture,
            ...emptyArticle
          })}
          onAuthorPress={() => {}}
          onLinkPress={() => {}}
          onRelatedArticlePress={() => {}}
          onTopicPress={() => {}}
          onVideoPress={() => {}}
        />
      );

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "an article with ads",
    test() {
      const output = renderComponent(
        <Article
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({
            ...testFixture,
            ...emptyArticle,
            content: [
              {
                name: "ad",
                attributes: {},
                children: []
              }
            ]
          })}
          onAuthorPress={() => {}}
          onLinkPress={() => {}}
          onRelatedArticlePress={() => {}}
          onTopicPress={() => {}}
          onVideoPress={() => {}}
        />
      );

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "a secondary image",
    test() {
      const output = renderComponent(
        <Article
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({
            ...testFixture,
            ...emptyArticle,
            content: [
              {
                name: "image",
                attributes: {
                  display: "secondary",
                  ratio: "3:2",
                  url: "https://image-2.io",
                  caption: "A Caption",
                  credits: "Some Credits"
                },
                children: []
              }
            ]
          })}
          onAuthorPress={() => {}}
          onLinkPress={() => {}}
          onRelatedArticlePress={() => {}}
          onTopicPress={() => {}}
          onVideoPress={() => {}}
        />
      );

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "an inline image",
    test() {
      const output = renderComponent(
        <Article
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({
            ...testFixture,
            ...emptyArticle,
            content: [
              {
                name: "image",
                attributes: {
                  display: "inline",
                  ratio: "9:4",
                  url: "https://image-inline.io",
                  caption: "A Caption",
                  credits: "Some Credits"
                },
                children: []
              }
            ]
          })}
          onAuthorPress={() => {}}
          onLinkPress={() => {}}
          onRelatedArticlePress={() => {}}
          onTopicPress={() => {}}
          onVideoPress={() => {}}
        />
      );

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "an article loading state",
    test() {
      const testInstance = TestRenderer.create(
        <Article
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture()}
          isLoading
          onAuthorPress={() => {}}
          onLinkPress={() => {}}
          onRelatedArticlePress={() => {}}
          onTopicPress={() => {}}
          onVideoPress={() => {}}
        />
      );

      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "an article with updated byline",
    test() {
      class Wrapper extends Component {
        constructor(props) {
          super(props);

          this.state = {
            byline: null
          };
        }

        render() {
          return this.props.children(this.state.byline);
        }
      }

      Wrapper.propTypes = {
        children: PropTypes.func.isRequired
      };

      const output = renderComponent(
        <Wrapper>
          {byline => (
            <Article
              adConfig={adConfig}
              analyticsStream={() => {}}
              article={articleFixture({
                ...testFixture,
                ...emptyArticle,
                byline
              })}
              onAuthorPress={() => {}}
              onLinkPress={() => {}}
              onRelatedArticlePress={() => {}}
              onTopicPress={() => {}}
              onVideoPress={() => {}}
            />
          )}
        </Wrapper>
      );

      expect(output).toMatchSnapshot();

      output.getInstance().setState({ byline: testFixture.byline });

      expect(output).toMatchSnapshot();
    }
  }
];

const negativeTests = [
  {
    name: "an article with no flags",
    test() {
      const testInstance = TestRenderer.create(
        <Article
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({
            ...testFixture,
            flags: null
          })}
          onAuthorPress={() => {}}
          onLinkPress={() => {}}
          onRelatedArticlePress={() => {}}
          onTopicPress={() => {}}
          onVideoPress={() => {}}
        />
      );

      const flags = findComponents(testInstance, "Flag");

      expect(flags).toEqual([]);
    }
  },
  {
    name: "an article with no byline",
    test() {
      const testInstance = TestRenderer.create(
        <Article
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({ ...testFixture, byline: null })}
          onAuthorPress={() => {}}
          onLinkPress={() => {}}
          onRelatedArticlePress={() => {}}
          onTopicPress={() => {}}
          onVideoPress={() => {}}
        />
      );

      const byline = findComponents(testInstance, "ArticleBylineWithLinks");

      expect(byline).toEqual([]);
    }
  },
  {
    name: "an article with no label",
    test() {
      const testInstance = TestRenderer.create(
        <Article
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({ ...testFixture, label: null })}
          onAuthorPress={() => {}}
          onLinkPress={() => {}}
          onRelatedArticlePress={() => {}}
          onTopicPress={() => {}}
          onVideoPress={() => {}}
        />
      );

      const label = findComponents(testInstance, "ArticleLabel");

      expect(label).toEqual([]);
    }
  },
  {
    name: "an article with no standfirst",
    test() {
      const testInstance = TestRenderer.create(
        <Article
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({
            ...testFixture,
            standfirst: null
          })}
          onAuthorPress={() => {}}
          onLinkPress={() => {}}
          onRelatedArticlePress={() => {}}
          onTopicPress={() => {}}
          onVideoPress={() => {}}
        />
      );

      const textNodes = testInstance.root.findAll(node => {
        if (typeof node.type === "string") {
          return (
            node.type === "Text" &&
            typeof node.props.children === "string" &&
            node.props.children === "Some Standfirst"
          );
        }

        return false;
      });

      expect(textNodes).toEqual([]);
    }
  }
];

export default (renderComponent, platformTests = []) => {
  const realIntl = Intl;

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
  });

  afterEach(() => {
    global.Intl = realIntl;
  });

  iterator([
    ...snapshotTests(renderComponent),
    ...platformTests,
    ...negativeTests
  ]);
};

export { adConfig };
