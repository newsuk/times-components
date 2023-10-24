/* eslint-disable react/no-multi-comp */
import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import { TCThemeProvider } from "@times-components/ts-newskit";
import ArticleMainComment from "../src/article-main-comment";
import articleFixture, { testFixture } from "../fixtures/full-article";
import sharedProps from "./shared-props";
import { adConfig } from "./ad-mock";

jest.mock("@times-components/save-and-share-bar", () => "SaveAndShareBar");

const findComponents = (testInstance, componentName) =>
  testInstance.root.findAll(node => {
    if (typeof node.type === "string") {
      return node.type.includes(componentName);
    }

    return false;
  });

const emptyArticle = {
  expirableFlags: [],
  label: null,
  standfirst: null
};

export const snapshotTests = renderComponent => [
  {
    name: "an error",
    test() {
      const testRenderer = renderComponent(
        <TCThemeProvider>
          <ArticleMainComment
            {...sharedProps}
            error={{ message: "An example error." }}
          />
        </TCThemeProvider>
      );

      expect(testRenderer).toMatchSnapshot();
    }
  },
  {
    name: "loading",
    test() {
      const testRenderer = renderComponent(
        <TCThemeProvider>
          <ArticleMainComment {...sharedProps} isLoading />
        </TCThemeProvider>
      );

      expect(testRenderer).toMatchSnapshot();
    }
  },
  {
    name: "an article with no headline falls back to use shortHeadline",
    test() {
      const testRenderer = renderComponent(
        <TCThemeProvider>
          <ArticleMainComment
            {...sharedProps}
            article={articleFixture({
              ...testFixture,
              ...emptyArticle,
              headline: ""
            })}
          />
        </TCThemeProvider>
      );

      expect(testRenderer).toMatchSnapshot();
    }
  },
  {
    name: "an article with ads",
    test() {
      const testRenderer = renderComponent(
        <TCThemeProvider>
          <ArticleMainComment
            {...sharedProps}
            article={articleFixture({
              ...testFixture,
              ...emptyArticle,
              content: [
                {
                  attributes: {},
                  children: [],
                  name: "ad"
                }
              ]
            })}
          />
        </TCThemeProvider>
      );

      expect(testRenderer).toMatchSnapshot();
    }
  }
];

const negativeTests = [
  {
    name: "an article with no label",
    test() {
      const testRenderer = TestRenderer.create(
        <TCThemeProvider>
          <ArticleMainComment
            {...sharedProps}
            article={articleFixture({ ...testFixture, label: null })}
          />
        </TCThemeProvider>
      );

      const label = findComponents(testRenderer, "ArticleLabel");

      expect(label).toEqual([]);
    }
  },
  {
    name: "an article with no standfirst",
    test() {
      const testRenderer = TestRenderer.create(
        <TCThemeProvider>
          <ArticleMainComment
            {...sharedProps}
            article={articleFixture({
              ...testFixture,
              standfirst: null
            })}
          />
        </TCThemeProvider>
      );

      const textNodes = testRenderer.root.findAll(node => {
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
