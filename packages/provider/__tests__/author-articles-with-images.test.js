import React from "react";
import renderer from "react-test-renderer";
import {
  fixtureGenerator,
  MockedProvider
} from "@times-components/provider-test-tools";
import { AuthorArticlesWithImagesProvider } from "../src/provider";

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

const renderComponent = child =>
  renderer.create(
    <MockedProvider
      mocks={fixtureGenerator.makeArticleMocks({
        delay: 0,
        list,
        pageSize: 5,
        withImages: true
      })}
    >
      <AuthorArticlesWithImagesProvider
        debounceTimeMs={0}
        page={1}
        pageSize={5}
        slug="deborah-haynes"
      >
        {child}
      </AuthorArticlesWithImagesProvider>
    </MockedProvider>
  );

describe("AuthorArticlesWithImagesProvider", () => {
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
