import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { fixtureGenerator } from "@times-components/provider-test-tools";
import { MockedProvider } from "@times-components/utils";
import AuthorProfile from "../src/author-profile";

export default () => {
  const authorProfileProps = {
    analyticsStream: () => {},
    onArticlePress: () => {},
    onTwitterLinkPress: () => {},
    page: 1,
    pageSize: 3,
    refetch: () => {},
    slug: "deborah-haynes"
  };

  const mocks = fixtureGenerator.makeArticleMocks({
    pageSize: 3,
    withImages: true
  });

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

  it("should render correctly", async () => {
    const tree = renderer.create(
      <MockedProvider
        mocks={mocks}
      >
        <AuthorProfile
          {...authorProfileProps}
          analyticsStream={() => {}}
          author={fixtureGenerator.makeAuthor({ withImages: true })}
          isLoading={false}
        />
      </MockedProvider>
    );

    await delay(1500);

    expect(tree).toMatchSnapshot("1. Render an author profile page");
  });

  it("should render the loading state", () => {
    const tree = renderer.create(
      <MockedProvider
        mocks={mocks}
      >
        <AuthorProfile
          {...authorProfileProps}
          isLoading
        />
      </MockedProvider>
    );

    expect(tree).toMatchSnapshot("2. Render an article list loading state");
  });

  it("should render the article list page error state", () => {
    const tree = renderer.create(
      <AuthorProfile {...authorProfileProps} error={{}} />
    );

    expect(tree).toMatchSnapshot("3. Render an article list page error state");
  });

  it("should send analytics when rendering an author profile page", () => {
    const reporter = jest.fn();
    const author = fixtureGenerator.makeAuthor();
    const authorName = author.name;

    renderer.create(
      <MockedProvider mocks={fixtureGenerator.makeArticleMocks()}>
        <AuthorProfile
          {...authorProfileProps}
          analyticsStream={reporter}
          author={author}
          isLoading={false}
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
          authorName,
          page: 1,
          pageSize: 3
        })
      })
    );
  });
};
