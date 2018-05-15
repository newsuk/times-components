import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@times-components/utils";
import AuthorProfile from "../src/author-profile";

import mockArticles from "../fixtures/article-list-with-images.json";
import mockArticlesWithoutImages from "../fixtures/article-list-no-images.json";
import mockAuthor from "../fixtures/author-profile.json";

export default () => {
  const props = {
    analyticsStream: () => {},
    author: mockAuthor,
    isLoading: false,
    onArticlePress: () => {},
    onTwitterLinkPress: () => {},
    page: 1,
    pageSize: 3,
    refetch: () => {},
    slug: "deborah-haynes"
  };

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const realIntl = Intl;

  beforeAll(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
  });

  afterAll(() => {
    global.Intl = realIntl;
  });

  it("should render with images", async () => {
    const tree = renderer.create(
      <MockedProvider mocks={mockArticles}>
        <AuthorProfile
          {...props}
        />
      </MockedProvider>
    );

    await delay(1500);

    expect(tree).toMatchSnapshot("1. Render an author profile page");
  });

  it("should render without images", async () => {
    const tree = renderer.create(
      <MockedProvider mocks={mockArticlesWithoutImages}>
        <AuthorProfile
          {...props}
        />
      </MockedProvider>
    );

    await delay(1500);

    expect(tree).toMatchSnapshot("1. Render an author profile page");
  });

  it("should render the loading state", () => {
    const tree = renderer.create(
      <MockedProvider mocks={mockArticles}>
        <AuthorProfile {...props} isLoading />
      </MockedProvider>
    );

    expect(tree).toMatchSnapshot("2. Render an article list loading state");
  });

  it("should render the article list page error state", () => {
    const tree = renderer.create(<AuthorProfile {...props} error={{}} />);

    expect(tree).toMatchSnapshot("3. Render an article list page error state");
  });

  it("should send analytics when rendering an author profile page", () => {
    const reporter = jest.fn();

    renderer.create(
      <MockedProvider mocks={mockArticles}>
        <AuthorProfile
          {...props}
          analyticsStream={reporter}
        />
      </MockedProvider>
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        object: "AuthorProfile",
        component: "Page",
        action: "Viewed",
        attrs: expect.objectContaining({
          articlesCount: 20,
          authorName: mockAuthor.name,
          page: 1,
          pageSize: 3
        })
      })
    );
  });
};
