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
    refetch: () => {},
    slug: "deborah-haynes"
  };

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
          author={fixtureGenerator.makeAuthor({ withImages: true })}
          analyticsStream={() => {}}
          isLoading={false}
          page={1}
          pageSize={pageSize}
          slug={authorProfileProps.slug}
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
      <AuthorProfile
        analyticsStream={() => {}}
        error={{}}
        refetch={jest.fn()}
        slug={authorProfileProps.slug}
      />
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
        attrs: expect.objectContaining({
          authorName,
          page: 1,
          pageSize
        })
      })
    );
  });
};
