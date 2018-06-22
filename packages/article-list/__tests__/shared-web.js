import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { mount, shallow } from "enzyme";
import { AdComposer } from "@times-components/ad";
import ArticleListPagination from "../src/article-list-pagination";
import ArticleList from "./../src/article-list";
import ArticleListItem from "./../src/article-list-item";
import articleListProps from "./default-article-list-props";
import pagedResult from "./paged-result";

const { defaultProps: { adConfig } } = AdComposer;

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
    const wrapper = mount(
      <ArticleList
        {...articleListProps}
        adConfig={adConfig}
        articles={results.articles.list}
        onArticlePress={onArticlePressMock}
        page={1}
        pageSize={pageSize}
      />
    );

    wrapper
      .find(ArticleListItem)
      .at(0)
      .find("Link")
      .props()
      .onPress();

    expect(onArticlePressMock).toHaveBeenCalled();
  });

  it("should not re-render if the page prop changes", () => {
    const onArticlePressMock = jest.fn();
    const pageSize = 3;
    const results = pagedResult(0, pageSize);
    const wrapper = shallow(
      <ArticleList
        {...articleListProps}
        adConfig={adConfig}
        articles={results.articles.list}
        onArticlePress={onArticlePressMock}
        page={1}
        pageSize={pageSize}
      />
    );

    expect(wrapper.prop("page")).toEqual(1);

    wrapper.setProps({ isLoading: true });

    expect(wrapper.prop("page")).toEqual(1);
  });

  it("should show an advert after the fifth article", () => {
    const pageSize = 6;
    const results = pagedResult(0, pageSize);
    const tree = renderer.create(
      <ArticleList
        {...articleListProps}
        adConfig={adConfig}
        articles={results.articles.list}
        page={1}
        pageSize={pageSize}
      />
    );

    expect(tree).toMatchSnapshot();
  });
};
