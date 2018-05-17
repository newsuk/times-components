import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { delay, MockedProvider } from "@times-components/utils";
import AuthorProfile from "../src/author-profile";
import {
  mockArticles,
  mockArticlesWithoutImages,
  mockAuthor,
  mockAuthorWithoutImages,
  props
} from "./mocks";

export default () => {
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
        <AuthorProfile {...props} />
      </MockedProvider>
    );

    await delay(1500);

    expect(tree).toMatchSnapshot("1. Render an author profile page");
  });

  it("should render without images", async () => {
    const tree = renderer.create(
      <MockedProvider mocks={mockArticlesWithoutImages}>
        <AuthorProfile {...props} author={mockAuthorWithoutImages} />
      </MockedProvider>
    );

    await delay(1500);

    expect(tree).toMatchSnapshot(
      "2. Render an author profile page without images"
    );
  });

  it("should render the loading state", () => {
    const tree = renderer.create(
      <MockedProvider mocks={mockArticles}>
        <AuthorProfile {...props} isLoading />
      </MockedProvider>
    );

    expect(tree).toMatchSnapshot(
      "3. Render an author profile page loading state"
    );
  });

  it("should render the author page with an article list page error state", () => {
    const tree = renderer.create(<AuthorProfile {...props} error={{}} />);

    expect(tree).toMatchSnapshot(
      "4. Render an author profile page error state"
    );
  });

  it("should send analytics when rendering an author profile page", () => {
    const reporter = jest.fn();

    renderer.create(
      <MockedProvider mocks={mockArticles}>
        <AuthorProfile {...props} analyticsStream={reporter} />
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
