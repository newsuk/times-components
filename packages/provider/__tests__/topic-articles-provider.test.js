import React from "react";
import renderer from "react-test-renderer";
import {
  fixtureGenerator,
  MockedProvider
} from "@times-components/provider-test-tools";
import { TopicArticlesProvider } from "../src/provider";

const pageSize = 5;

const list = fixtureGenerator.makeCustomArticles(1, {
  byline(i) {
    return [
      {
        name: "text",
        attributes: {
          value: `Byline ${i}`
        },
        children: []
      }
    ];
  },
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
      id: "7225cd6a-701c-11e8-bea3-bf1a5a054f1b",
      title: "Title",
      crop: {
        url: "https://crop.io",
        __typename: "Crop"
      },
      type: "Image",
      __typename: "Image"
    };
  },
  publicationName(i) {
    return i % 2 ? "TIMES" : "SUNDAYTIMES";
  },
  publishedTime() {
    return "2018-06-14T23:01:00.000Z";
  },
  section(i) {
    return `Section ${i}`;
  },
  shortHeadline(i) {
    return `Short Headline ${i}`;
  },
  summary(i) {
    return [
      {
        name: "text",
        attributes: {
          value: `Summary ${i}`
        },
        children: []
      }
    ];
  },
  url(i) {
    return `https://article${i}.io`;
  }
});

const mocks = fixtureGenerator.makeTopicArticleMocks({
  list,
  pageSize,
  withImages: true
});

const renderComponent = child =>
  renderer.create(
    <MockedProvider mocks={mocks}>
      <TopicArticlesProvider
        debounceTimeMs={0}
        page={1}
        pageSize={pageSize}
        slug="chelsea"
      >
        {child}
      </TopicArticlesProvider>
    </MockedProvider>
  );

describe("TopicArticlesProvider", () => {
  it("returns query result", done => {
    renderComponent(({ isLoading, topic }) => {
      if (!isLoading) {
        expect(topic).toMatchSnapshot();
        done();
      }

      return null;
    });
  });
});
