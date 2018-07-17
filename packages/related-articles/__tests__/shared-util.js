import React from "react";
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

  it("callback triggered on related article press", () => {
    const onRelatedArticlePress = jest.fn();
    const article = fixture1.relatedArticles[0];

    const wrapper = shallow(
      <RelatedArticleItem article={article} onPress={onRelatedArticlePress} />
    );

    const eventMock = {};
    wrapper
      .find("Link")
      .at(0)
      .simulate("press", eventMock);

    expect(onRelatedArticlePress).toHaveBeenCalledWith(eventMock, {
      url: article.url
    });
  });

  it("no related articles", () => {
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

    expect(output).toMatchSnapshot("1. no related articles");
  });

  it("analytics with no related articles", () => {
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

    expect(events.mock.calls).toMatchSnapshot(
      "1a. analytics with no related articles"
    );
  });

  it(one, () => {
    const events = jest.fn();

    const output = renderComponent(
      <RelatedArticles {...createRelatedArticlesProps(fixture1, events)} />
    );

    expect(output).toMatchSnapshot(`2. ${one}`);
  });

  it(`analytics for ${one}`, () => {
    const events = jest.fn();

    renderComponent(
      <RelatedArticles {...createRelatedArticlesProps(fixture1, events)} />
    );

    expect(events.mock.calls).toMatchSnapshot(
      `2a. analytics for ${one}`
    );
  });

  it(two, () => {
    const events = jest.fn();

    const output = renderComponent(
      <RelatedArticles {...createRelatedArticlesProps(fixture2, events)} />
    );

    expect(output).toMatchSnapshot(`3. ${two}`);
  });

  it(`analytics for ${two}`, () => {
    const events = jest.fn();

    renderComponent(
      <RelatedArticles {...createRelatedArticlesProps(fixture2, events)} />
    );

    expect(events.mock.calls).toMatchSnapshot(
      `3a. analytics for ${two}`
    );
  });

  it(three, () => {
    const events = jest.fn();

    const output = renderComponent(
      <RelatedArticles {...createRelatedArticlesProps(fixture3, events)} />
    );
    expect(output).toMatchSnapshot(`4. ${three}`);
  });

  it(`analytics for ${three}`, () => {
    const events = jest.fn();

    renderComponent(
      <RelatedArticles {...createRelatedArticlesProps(fixture3, events)} />
    );

    expect(events.mock.calls).toMatchSnapshot(
      `4a. analytics for ${three}`
    );
  });
};
