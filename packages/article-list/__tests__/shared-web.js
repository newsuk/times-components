import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import ArticleListPagination from "../src/article-list-pagination";
import ArticleList from "./../src/article-list";
import ArticleListItem from "./../src/article-list-item";
import articleListProps from "./default-article-list-props";
import pagedResult from "./paged-result";

export default () => {
  it("should render the article list pagination correctly", () => {
    const tree = renderer.create(
      <ArticleListPagination count={20} page={1} pageSize={10} />
    );

    expect(tree).toMatchSnapshot();
  });

  it("should handle the link to an article from an article list", () => {
    const onArticlePressMock = jest.fn();
    const pageSize = 3;
    const results = pagedResult(0, pageSize);
    const wrapper = shallow(
      <ArticleList
        {...articleListProps}
        articles={results.articles.list}
        onArticlePress={onArticlePressMock}
        page={1}
        pageSize={pageSize}
      />
    );

    wrapper
      .dive()
      .find("ErrorView")
      .at(0)
      .dive()
      .find(ArticleListItem)
      .at(0)
      .dive()
      .dive()
      .find("Link")
      .simulate("press");

    expect(onArticlePressMock).toHaveBeenCalled();
  });
};
