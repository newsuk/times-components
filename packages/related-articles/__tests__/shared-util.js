import React from "react";
import { iterator } from "@times-components/test-utils";
import mockDate from "mockdate";
import { shallow } from "enzyme";

import RelatedArticles from "../src/related-articles";
import RelatedArticleItem from "../src/related-article-item";

export const testSummary = summary => [
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value: `Summary ${summary}`
        },
        children: []
      }
    ]
  }
];

export const createRelatedArticlesProps = (
  fixtureData,
  action = () => {},
  onPress = () => {}
) => ({
  analyticsStream: action,
  articles: fixtureData.relatedArticles,
  template: fixtureData.relatedArticlesLayout.template,
  mainId: fixtureData.relatedArticlesLayout.main,
  onPress
});

export default ({
  fixture1,
  fixture2,
  fixture3,
  one,
  template,
  three,
  two
}) => renderComponent => {
  const realIntl = Intl;

  beforeEach(() => {
    mockDate.set(1514764800000, 0);
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
    jest.useFakeTimers();
  });

  afterEach(() => {
    mockDate.reset();
    global.Intl = realIntl;
  });

  const tests = [
    {
      name: "no related articles",
      test() {
        const events = jest.fn();

        const data = {
          relatedArticles: [],
          relatedArticlesLayout: {
            template
          }
        };
        const output = renderComponent(
          <RelatedArticles {...createRelatedArticlesProps(data, events)} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "analytics with no related articles",
      test() {
        const events = jest.fn();

        const data = {
          relatedArticles: [],
          relatedArticlesLayout: {
            template
          }
        };

        renderComponent(
          <RelatedArticles {...createRelatedArticlesProps(data, events)} />
        );

        expect(events.mock.calls).toMatchSnapshot();
      }
    },
    {
      name: one,
      test() {
        const events = jest.fn();

        const output = renderComponent(
          <RelatedArticles {...createRelatedArticlesProps(fixture1, events)} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: `analytics for ${one}`,
      test() {
        const events = jest.fn();

        renderComponent(
          <RelatedArticles {...createRelatedArticlesProps(fixture1, events)} />
        );

        expect(events.mock.calls).toMatchSnapshot();
      }
    },
    {
      name: two,
      test() {
        const events = jest.fn();

        const output = renderComponent(
          <RelatedArticles {...createRelatedArticlesProps(fixture2, events)} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: `analytics for ${two}`,
      test() {
        const events = jest.fn();

        renderComponent(
          <RelatedArticles {...createRelatedArticlesProps(fixture2, events)} />
        );

        expect(events.mock.calls).toMatchSnapshot();
      }
    },
    {
      name: three,
      test() {
        const events = jest.fn();

        const output = renderComponent(
          <RelatedArticles {...createRelatedArticlesProps(fixture3, events)} />
        );
        expect(output).toMatchSnapshot();
      }
    },
    {
      name: `analytics for ${three}`,
      test() {
        const events = jest.fn();

        renderComponent(
          <RelatedArticles {...createRelatedArticlesProps(fixture3, events)} />
        );

        expect(events.mock.calls).toMatchSnapshot();
      }
    },
    {
      name: "callback triggered on related article press",
      test() {
        const onRelatedArticlePress = jest.fn();
        const article = fixture1.relatedArticles[0];

        const wrapper = shallow(
          <RelatedArticleItem
            article={article}
            onPress={onRelatedArticlePress}
          />
        );

        const eventMock = {};
        wrapper
          .find("Link")
          .at(0)
          .simulate("press", eventMock);

        expect(onRelatedArticlePress).toHaveBeenCalledWith(eventMock, {
          url: article.url
        });
      }
    }
  ];

  iterator(tests);
};
