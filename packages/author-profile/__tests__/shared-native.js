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
};
