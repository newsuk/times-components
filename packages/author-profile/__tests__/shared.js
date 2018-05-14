import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { fixtureGenerator } from "@times-components/provider-test-tools";
import { MockedProvider } from "@times-components/utils";
import AuthorProfile from "../src/author-profile";

export default () => {
  const realIntl = Intl;

  const authorProfileProps = {
    analyticsStream: () => {},
    onArticlePress: () => {},
    onTwitterLinkPress: () => {},
    refetch: () => {},
    slug: "deborah-haynes"
  };

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
    jest.useFakeTimers();
  });

  afterEach(() => {
    global.Intl = realIntl;
  });

  it("should render correctly", () => {
    const pageSize = 3;
    const tree = renderer.create(
      <MockedProvider
        mocks={fixtureGenerator.makeArticleMocks({
          pageSize,
          withImages: true
        })}
      >
        <AuthorProfile
          {...authorProfileProps}
          author={fixtureGenerator.makeAuthor({ withImages: true })}
          analyticsStream={() => {}}
          isLoading={false}
          page={1}
          pageSize={pageSize}
        />
      </MockedProvider>
    );

    expect(tree).toMatchSnapshot("1. Render an author profile page");
  });

  it("should render the loading state", () => {
    const pageSize = 3;
    const tree = renderer.create(
      <MockedProvider
        mocks={fixtureGenerator.makeArticleMocks({
          pageSize,
          withImages: true
        })}
      >
        <AuthorProfile
          {...authorProfileProps}
          isLoading
          page={1}
          pageSize={pageSize}
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
    const pageSize = 3;
    const author = fixtureGenerator.makeAuthor();
    const authorName = author.name;

    renderer.create(
      <MockedProvider mocks={fixtureGenerator.makeArticleMocks()}>
        <AuthorProfile
          {...authorProfileProps}
          analyticsStream={reporter}
          author={author}
          isLoading={false}
          page={1}
          pageSize={pageSize}
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
          pageSize
        })
      })
    );
  });
};
