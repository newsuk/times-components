import React from "react";
import renderer from "react-test-renderer";
import {
  fixtureGenerator,
  MockedProvider
} from "@times-components/provider-test-tools";
import AuthorArticlesNoImagesProvider from "../../src/author-articles-no-images";

const list = fixtureGenerator.makeCustomArticles(1, {
  headline(i) {
    return `Headline ${i}`;
  },
  id(i) {
    return `7225cd6a-701c-11e8-bea3-bf1a5a054f${i}a`;
  },
  label(i) {
    return `Label ${i}`;
  },
  leadAsset() {
    return {
      type: "Image"
    };
  },
  longSummary(i) {
    return [
      {
        name: "text",
        attributes: {
          value: `Long Summary ${i}`
        },
        children: []
      }
    ];
  },
  publicationName(i) {
    return i % 2 ? "TIMES" : "SUNDAYTIMES";
  },
  publishedTime() {
    return "2018-06-14T23:01:00.000Z";
  },
  shortHeadline(i) {
    return `Short Headline ${i}`;
  },
  shortSummary(i) {
    return [
      {
        name: "text",
        attributes: {
          value: `Short Summary ${i}`
        },
        children: []
      }
    ];
  },
  url(i) {
    return `https://article${i}.io`;
  }
});

const renderComponent = child =>
  renderer.create(
    <MockedProvider
      mocks={fixtureGenerator.makeArticleMocks({
        list,
        longSummaryLength: 360,
        pageSize: 5,
        delay: 0
      })}
    >
      <AuthorArticlesNoImagesProvider
        debounceTimeMs={0}
        page={1}
        pageSize={5}
        slug="deborah-haynes"
      >
        {child}
      </AuthorArticlesNoImagesProvider>
    </MockedProvider>
  );

describe("AuthorArticlesNoImagesProvider", () => {
  it("returns query result", done => {
    renderComponent(({ isLoading, author }) => {
      if (!isLoading) {
        expect(author).toMatchSnapshot();
        done();
      }

      return null;
    });
  });
});
