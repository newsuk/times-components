import React from "react";
import mockDate from "mockdate";
import { shallow } from "enzyme";

import RelatedArticles from "../src/related-articles";
import RelatedArticleItem from "../src/related-article-item";

import leadAndTwo1ArticleFixture from "../fixtures/leadandtwo/1-article.json";
import leadAndTwo2ArticlesFixture from "../fixtures/leadandtwo/2-articles.json";
import leadAndTwo3ArticlesFixture from "../fixtures/leadandtwo/3-articles.json";

const createRelatedArticlesProps = (
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

export default renderComponent => {
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
    const article = leadAndTwo1ArticleFixture.data.relatedArticles[0];

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

  it("should render one lead related article", () => {
    const events = jest.fn();

    const output = renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(leadAndTwo1ArticleFixture.data, events)}
      />
    );

    expect(output).toMatchSnapshot("1 .should render one lead related article");
  });

  it("should send analytics for a lead related article", () => {
    const events = jest.fn();

    renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(leadAndTwo1ArticleFixture.data, events)}
      />
    );

    expect(events.mock.calls).toEqual([]);
  });

  it("should render one lead and one support related article", () => {
    const events = jest.fn();

    const output = renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(leadAndTwo2ArticlesFixture.data, events)}
      />
    );

    expect(output).toMatchSnapshot(
      "2. should render one lead and one support related article"
    );
  });

  it("should send analytics for one lead and one support related article", () => {
    const events = jest.fn();

    renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(leadAndTwo2ArticlesFixture.data, events)}
      />
    );

    expect(events.mock.calls).toEqual([]);
  });

  it("should render one lead and two support related articles", () => {
    const events = jest.fn();

    const output = renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(leadAndTwo3ArticlesFixture.data, events)}
      />
    );

    expect(output).toMatchSnapshot(
      "3. should render one lead and two support related articles"
    );
  });

  it("should send analytics for one lead and two support related articles", () => {
    const events = jest.fn();

    renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(leadAndTwo3ArticlesFixture.data, events)}
      />
    );

    expect(events.mock.calls).toEqual([]);
  });
};
