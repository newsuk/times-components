import React from "react";
import mockDate from "mockdate";
import { iterator, makeArticleUrl } from "@times-components/test-utils";
import Card from "@times-components/card";
import Context from "@times-components/context";
import RelatedArticles from "../src/related-articles";

export const testSummary = summary => [
  {
    attributes: {},
    children: [
      {
        attributes: {
          value: `Summary ${summary}`
        },
        children: [],
        name: "text"
      }
    ],
    name: "paragraph"
  }
];

export const createRelatedArticlesProps = (
  fixtureData,
  action = () => {},
  onPress = () => {}
) => ({
  analyticsStream: action,
  onPress,
  slice: fixtureData.relatedArticleSlice
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

export const noArticlesTests = ({ fixture }) => renderComponent => {
  beforeAndAfterEach();

  const tests = [
    {
      name: "no related articles",
      test() {
        const events = jest.fn();

        const output = renderComponent(
          <Context.Provider value={{ makeArticleUrl }}>
            <RelatedArticles {...createRelatedArticlesProps(fixture, events)} />
          </Context.Provider>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "no related articles when there is no given slice name",
      test() {
        const output = renderComponent(
          <Context.Provider value={{ makeArticleUrl }}>
            <RelatedArticles
              analyticsStream={() => {}}
              onPress={() => {}}
              slice={{
                sliceName: ""
              }}
            />
          </Context.Provider>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "analytics with no related articles",
      test() {
        const events = jest.fn();

        renderComponent(
          <Context.Provider value={{ makeArticleUrl }}>
            <RelatedArticles {...createRelatedArticlesProps(fixture, events)} />
          </Context.Provider>
        );

        expect(events.mock.calls).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};

export const hasVideoTests = ({ fixture, name }) => renderComponent => {
  beforeAndAfterEach();

  const tests = [
    {
      name,
      test() {
        const events = jest.fn();

        const output = renderComponent(
          <Context.Provider value={{ makeArticleUrl }}>
            <RelatedArticles {...createRelatedArticlesProps(fixture, events)} />
          </Context.Provider>
        );

        expect(output).toMatchSnapshot();
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
          <Context.Provider value={{ makeArticleUrl }}>
            <RelatedArticles {...createRelatedArticlesProps(fixture, events)} />
          </Context.Provider>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: `analytics for ${name}`,
      test() {
        const events = jest.fn();

        renderComponent(
          <Context.Provider value={{ makeArticleUrl }}>
            <RelatedArticles {...createRelatedArticlesProps(fixture, events)} />
          </Context.Provider>
        );

        expect(events.mock.calls).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};

export const oneArticleTests = (platform = () => []) => ({
  fixture,
  name
}) => renderComponent => {
  beforeAndAfterEach();

  const tests = [
    {
      name,
      test() {
        const events = jest.fn();

        const output = renderComponent(
          <Context.Provider value={{ makeArticleUrl }}>
            <RelatedArticles {...createRelatedArticlesProps(fixture, events)} />
          </Context.Provider>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: `analytics for ${name}`,
      test() {
        const events = jest.fn();

        renderComponent(
          <Context.Provider value={{ makeArticleUrl }}>
            <RelatedArticles {...createRelatedArticlesProps(fixture, events)} />
          </Context.Provider>
        );

        expect(events.mock.calls).toMatchSnapshot();
      }
    },
    ...platform(fixture, name)
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
          <Context.Provider value={{ makeArticleUrl }}>
            <RelatedArticles {...createRelatedArticlesProps(fixture, events)} />
          </Context.Provider>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: `analytics for ${name}`,
      test() {
        const events = jest.fn();

        renderComponent(
          <Context.Provider value={{ makeArticleUrl }}>
            <RelatedArticles {...createRelatedArticlesProps(fixture, events)} />
          </Context.Provider>
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
          <Context.Provider value={{ makeArticleUrl }}>
            <RelatedArticles {...createRelatedArticlesProps(fixture, events)} />
          </Context.Provider>
        );
        expect(output).toMatchSnapshot();
      }
    },
    {
      name: `analytics for ${name}`,
      test() {
        const events = jest.fn();

        renderComponent(
          <Context.Provider value={{ makeArticleUrl }}>
            <RelatedArticles {...createRelatedArticlesProps(fixture, events)} />
          </Context.Provider>
        );

        expect(events.mock.calls).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};

export const threeArticlesWithLeadAssetOverrideTests = ({
  fixture,
  name
}) => renderComponent => {
  beforeAndAfterEach();

  const tests = [
    {
      name,
      test() {
        const events = jest.fn();

        const output = renderComponent(
          <Context.Provider value={{ makeArticleUrl }}>
            <RelatedArticles {...createRelatedArticlesProps(fixture, events)} />
          </Context.Provider>
        );

        expect(output.root.findAllByType(Card)[0].props.imageUri).toEqual(
          "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F9d59bcac-d044-11e8-a7e2-4943f60e65b3.jpg?crop=1073%2C1750%2C64%2C400"
        );
      }
    }
  ];

  iterator(tests);
};
