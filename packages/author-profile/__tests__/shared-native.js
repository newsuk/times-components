import React from "react";
import { FlatList } from "react-native";
import renderer from "react-test-renderer";
import { MockedProvider } from "@times-components/utils";
import AuthorProfile from "../src/author-profile";
import { mockArticles, pageSize, props } from "./mocks";

export default () => {
  it("should fetch more articles on scroll", async () => {
    const tree = renderer.create(
      <MockedProvider mocks={mockArticles}>
        <AuthorProfile {...props} />
      </MockedProvider>
    );

    const flatList = tree.root.findByType(FlatList);

    expect(flatList.props.data.length).toBe(pageSize);
    await flatList.instance.props.onEndReached();
    expect(flatList.props.data.length).toBe(pageSize * 2);
  });

  it("should fetch correct articles on scroll", async () => {
    const tree = renderer.create(
      <MockedProvider mocks={mockArticles}>
        <AuthorProfile {...props} />
      </MockedProvider>
    );
    const [, ...articles] = mockArticles;
    const firstArticleInSecondPage =
      articles[1].result.data.author.articles.list[0];

    const flatList = tree.root.findByType(FlatList);
    await flatList.instance.props.onEndReached();

    expect(flatList.instance.props.data[pageSize].id).toBe(
      firstArticleInSecondPage.id
    );
  });
};
