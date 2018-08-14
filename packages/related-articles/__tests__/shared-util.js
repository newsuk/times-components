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

const beforeAndAfterEach = () => {
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
};

export const noArticlesTests = ({ fixture, template }) => renderComponent => {
  beforeAndAfterEach();

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
      name: "callback triggered on related article press",
      test() {
        const onRelatedArticlePress = jest.fn();
        const article = fixture.relatedArticles[0];

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

export const noShortHeadlineTests = ({ fixture, name }) => renderComponent => {
  beforeAndAfterEach();

  const tests = [
    {
      name,
      test() {
        const events = jest.fn();

        const output = renderComponent(
          <RelatedArticles {...createRelatedArticlesProps(fixture, events)} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: `analytics for ${name}`,
      test() {
        const events = jest.fn();

        renderComponent(
          <RelatedArticles {...createRelatedArticlesProps(fixture, events)} />
        );

        expect(events.mock.calls).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};

export const oneArticleTests = ({ fixture, name }) => renderComponent => {
  beforeAndAfterEach();

  const tests = [
    {
      name,
      test() {
        const events = jest.fn();

        const output = renderComponent(
          <RelatedArticles {...createRelatedArticlesProps(fixture, events)} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: `analytics for ${name}`,
      test() {
        const events = jest.fn();

        renderComponent(
          <RelatedArticles {...createRelatedArticlesProps(fixture, events)} />
        );

        expect(events.mock.calls).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};

export const twoArticlesTests = ({ fixture, name }) => renderComponent => {
  beforeAndAfterEach();

  const tests = [
    {
      name,
      test() {
        const events = jest.fn();

        const output = renderComponent(
          <RelatedArticles {...createRelatedArticlesProps(fixture, events)} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: `analytics for ${name}`,
      test() {
        const events = jest.fn();

        renderComponent(
          <RelatedArticles {...createRelatedArticlesProps(fixture, events)} />
        );

        expect(events.mock.calls).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};

export const threeArticlesTests = ({ fixture, name }) => renderComponent => {
  beforeAndAfterEach();

  const tests = [
    {
      name,
      test() {
        const events = jest.fn();

        const output = renderComponent(
          <RelatedArticles {...createRelatedArticlesProps(fixture, events)} />
        );
        expect(output).toMatchSnapshot();
      }
    },
    {
      name: `analytics for ${name}`,
      test() {
        const events = jest.fn();

        renderComponent(
          <RelatedArticles {...createRelatedArticlesProps(fixture, events)} />
        );

        expect(events.mock.calls).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
