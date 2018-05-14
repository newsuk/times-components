import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import AuthorProfile from "../src/author-profile";

jest.mock("@times-components/article-list", () => ({
  ArticleListPageError: "ArticleListPageError"
}));

export default () => {
  const authorProfileProps = {
    analyticsStream: () => {},
    onArticlePress: () => {},
    onTwitterLinkPress: () => {},
    refetch: () => {},
    slug: "deborah-haynes"
  };

  it("should render the article list page error state", () => {
    const tree = renderer.create(
      <AuthorProfile {...authorProfileProps} error={{}} />
    );

    expect(tree).toMatchSnapshot("3. Render an article list page error state");
  });
};
